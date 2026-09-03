#!/usr/bin/env bash
set -euo pipefail

DISPLAY_ID="${ESO_RIG_DISPLAY:-:99}"
GEOMETRY="${ESO_RIG_GEOMETRY:-1920x1080}"
INPUT_DEVICE="${ESO_RIG_INPUT_DEVICE:-}"
RUN_DIR="${ESO_RIG_RUN_DIR:-/run/eso-rig}"

SELF_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROBE="$SELF_DIR/rig-probe.py"
XORG_CONF="$RUN_DIR/xorg.conf"
XORG_LOG="$RUN_DIR/Xorg.log"

UINPUT_KEYSTROKES=5
WINE_KEYSTROKES=12
WINE_PIXEL_FLOOR=200

CLAIMS_TOTAL=0
CLAIMS_NOT_PASSED=0

log() { printf '[eso-rig] %s\n' "$*" >&2; }
die() {
  log "$*"
  exit 2
}

value_of() {
  printf '%s\n' "$2" | tr ' ' '\n' | sed -n "s/^$1=//p" | head -1
}

write_xorg_conf() {
  local device_path="$1"
  local width="${GEOMETRY%%x*}"
  local height="${GEOMETRY##*x}"
  local modeline mode_name
  modeline="$(gtf "$width" "$height" 60 | sed -n 's/^[[:space:]]*Modeline[[:space:]]*//p')"
  [ -n "$modeline" ] || die "gtf produced no modeline for ${width}x${height}"
  mode_name="$(printf '%s' "$modeline" | awk '{ print $1 }' | tr -d '"')"

  cat >"$XORG_CONF" <<EOF
Section "ServerFlags"
    # Hotplug OFF: the rig's input device is named explicitly below, and nothing
    Option "AutoAddDevices" "False"
    Option "AutoEnableDevices" "False"
    Option "DontVTSwitch" "True"
    Option "DontZap" "True"
EndSection

Section "Device"
    Identifier "eso-rig-dummy"
    Driver "dummy"
    VideoRam 262144
EndSection

Section "Monitor"
    Identifier "eso-rig-monitor"
    HorizSync 5.0 - 1000.0
    VertRefresh 5.0 - 200.0
    Modeline ${modeline}
EndSection

Section "Screen"
    Identifier "eso-rig-screen"
    Device "eso-rig-dummy"
    Monitor "eso-rig-monitor"
    DefaultDepth 24
    SubSection "Display"
        Depth 24
        Modes "${mode_name}"
        Virtual ${width} ${height}
    EndSubSection
EndSection
EOF

  if [ -z "$device_path" ]; then
    cat >>"$XORG_CONF" <<EOF

Section "ServerLayout"
    Identifier "eso-rig"
    Screen 0 "eso-rig-screen"
EndSection
EOF
    return 0
  fi

  cat >>"$XORG_CONF" <<EOF

Section "InputDevice"
    Identifier "eso-rig-keyboard"
    Driver "evdev"
    Option "Device" "${device_path}"
    # EVIOCGRAB. This server becomes the only reader of the virtual device, so
    # nothing else on the host can observe the rig's synthetic input or steal it.
    Option "GrabDevice" "True"
EndSection

Section "ServerLayout"
    Identifier "eso-rig"
    Screen 0 "eso-rig-screen"
    InputDevice "eso-rig-keyboard" "CoreKeyboard"
EndSection
EOF
}

start_xorg() {
  Xorg "$DISPLAY_ID" -config "$XORG_CONF" -logfile "$XORG_LOG" -noreset -nolisten tcp &
  XORG_PID=$!
  local deadline=$((SECONDS + 20))
  while [ "$SECONDS" -lt "$deadline" ]; do
    if xdpyinfo -display "$DISPLAY_ID" >/dev/null 2>&1; then
      xsetroot -display "$DISPLAY_ID" -solid black
      return 0
    fi
    if ! kill -0 "$XORG_PID" 2>/dev/null; then
      log "Xorg exited during startup — tail of ${XORG_LOG}:"
      tail -20 "$XORG_LOG" >&2 || true
      return 1
    fi
    sleep 0.5
  done
  return 1
}

start_uinput_device() {
  local fifo="$RUN_DIR/uinput.cmd" deadline line
  UINPUT_OUT="$RUN_DIR/uinput.out"
  rm -f "$fifo"
  mkfifo "$fifo"
  : >"$UINPUT_OUT"
  python3 "$PROBE" uinput <"$fifo" >"$UINPUT_OUT" 2>&1 &
  UINPUT_PID=$!
  exec 9>"$fifo"

  deadline=$((SECONDS + 15))
  while [ "$SECONDS" -lt "$deadline" ]; do
    line="$(grep -m1 '^EVENT ' "$UINPUT_OUT" 2>/dev/null || true)"
    if [ -n "$line" ]; then
      UINPUT_EVENT="${line#EVENT }"
      log "virtual keyboard at ${UINPUT_EVENT}"
      return 0
    fi
    sleep 0.2
  done
  die "uinput helper never reported an event node (is the host's /dev/input mounted?): $(tr '\n' ' ' <"$UINPUT_OUT")"
}

probe_inject() {
  local before after deadline
  before="$(grep -c '^INJECTED ' "$UINPUT_OUT" 2>/dev/null || true)"
  printf 'inject %s\n' "$1" >&9
  deadline=$((SECONDS + 20))
  while [ "$SECONDS" -lt "$deadline" ]; do
    after="$(grep -c '^INJECTED ' "$UINPUT_OUT" 2>/dev/null || true)"
    if [ "$after" -gt "$before" ]; then return 0; fi
    sleep 0.2
  done
  return 1
}

start_receiver() {
  XEV_LOG="$RUN_DIR/xev.log"
  : >"$XEV_LOG"
  xev -root >"$XEV_LOG" 2>&1 &
  XEV_PID=$!
}

keypress_count() { grep -c '^KeyPress event' "$XEV_LOG" 2>/dev/null || true; }

wait_for_keypress_delta() {
  local baseline="$1" want="$2" deadline current
  deadline=$((SECONDS + $3))
  while [ "$SECONDS" -lt "$deadline" ]; do
    current="$(keypress_count)"
    if [ "$((current - baseline))" -ge "$want" ]; then
      printf '%s' "$current"
      return 0
    fi
    sleep 0.2
  done
  printf '%s' "$(keypress_count)"
  return 1
}

wait_for_window() {
  local pattern="$1" deadline window
  deadline=$((SECONDS + $2))
  while [ "$SECONDS" -lt "$deadline" ]; do
    window="$(xdotool search --name "$pattern" 2>/dev/null | head -1 || true)"
    if [ -n "$window" ]; then
      printf '%s' "$window"
      return 0
    fi
    sleep 1
  done
  return 1
}

record() {
  printf 'VERDICT %-14s %-15s %s\n' "$1" "$2" "$3"
  CLAIMS_TOTAL=$((CLAIMS_TOTAL + 1))
  if [ "$2" != "PASS" ]; then CLAIMS_NOT_PASSED=$((CLAIMS_NOT_PASSED + 1)); fi
}

claim_gpu_render() {
  local summary device driver renderer
  if ! summary="$(vulkaninfo --summary 2>&1)"; then
    record gpu-render DID-NOT-MEASURE "vulkaninfo failed: $(printf '%s' "$summary" | head -1)"
    return
  fi
  device="$(printf '%s\n' "$summary" | sed -n 's/^[[:space:]]*deviceName[[:space:]]*=[[:space:]]*//p' | head -1)"
  driver="$(printf '%s\n' "$summary" | sed -n 's/^[[:space:]]*driverName[[:space:]]*=[[:space:]]*//p' | head -1)"
  if [ -z "$device" ]; then
    record gpu-render DID-NOT-MEASURE "vulkaninfo --summary listed no physical device (no ICD injected?)"
    return
  fi
  if ! printf '%s' "$device" | grep -qi nvidia; then
    record gpu-render FAIL "vulkan deviceName is not NVIDIA: '${device}'"
    return
  fi
  if ! printf '%s' "$driver" | grep -qi nvidia; then
    record gpu-render FAIL "vulkan driverName is not NVIDIA: '${driver}' (device '${device}')"
    return
  fi
  renderer="$(__GLX_VENDOR_LIBRARY_NAME=nvidia glxinfo -B -display "$DISPLAY_ID" 2>/dev/null | sed -n 's/^OpenGL renderer string: //p' | head -1)"
  if [ -z "$renderer" ]; then
    record gpu-render DID-NOT-MEASURE "vulkan device '${device}' is NVIDIA, but glxinfo reported no GL_RENDERER on ${DISPLAY_ID}"
    return
  fi
  if printf '%s' "$renderer" | grep -Eqi 'llvmpipe|swrast|softpipe'; then
    record gpu-render FAIL "GL_RENDERER '${renderer}' is a SOFTWARE rasterizer — its frames are pixel-identical to the card's, so this string is the only discriminator"
    return
  fi
  record gpu-render PASS "vulkan device '${device}' driver '${driver}'; GL_RENDERER '${renderer}'"
}

claim_input_lands() {
  local before after control_ok=0
  for _ in 1 2 3; do
    before="$(keypress_count)"
    xdotool key --clearmodifiers a || true
    if after="$(wait_for_keypress_delta "$before" 1 3)"; then
      control_ok=1
      break
    fi
  done
  if [ "$control_ok" -ne 1 ]; then
    record input-lands DID-NOT-MEASURE "XTEST positive control never reached the xev receiver — a uinput result read from it would be meaningless"
    return
  fi

  before="$(keypress_count)"
  if ! probe_inject "$UINPUT_KEYSTROKES"; then
    record input-lands DID-NOT-MEASURE "the uinput injector never acknowledged the inject command"
    return
  fi
  if ! after="$(wait_for_keypress_delta "$before" "$UINPUT_KEYSTROKES" 10)"; then
    record input-lands FAIL "receiver saw +$((after - before)) of ${UINPUT_KEYSTROKES} keystrokes injected on ${UINPUT_EVENT} — read at the RECEIVER, because a clean injector exit proves only that bytes were written to a device"
    return
  fi
  record input-lands PASS "XTEST control reached the receiver, then uinput delta +$((after - before))/${UINPUT_KEYSTROKES} on ${UINPUT_EVENT}"
}

claim_wine_gui_input() {
  local window colors differing
  wine notepad >"$RUN_DIR/wine.log" 2>&1 &
  WINE_PID=$!
  if ! window="$(wait_for_window Notepad 120)"; then
    record wine-gui-input DID-NOT-MEASURE "no Wine window matching /Notepad/ appeared within 120s (see ${RUN_DIR}/wine.log)"
    return
  fi
  sleep 2
  xwd -root -silent -out "$RUN_DIR/before.xwd"
  colors="$(value_of colors "$(python3 "$PROBE" xwd-stats "$RUN_DIR/before.xwd")")"
  if [ "$colors" -le 1 ]; then
    record wine-gui-input FAIL "the capture is uniformly one color with a mapped window on screen — a blank capture reporting success is exactly what this claim exists to catch"
    return
  fi

  xdotool windowfocus "$window"
  sleep 1
  if ! probe_inject "$WINE_KEYSTROKES"; then
    record wine-gui-input DID-NOT-MEASURE "the uinput injector never acknowledged the inject command"
    return
  fi
  sleep 2
  xwd -root -silent -out "$RUN_DIR/after.xwd"
  differing="$(value_of differing "$(python3 "$PROBE" xwd-diff "$RUN_DIR/before.xwd" "$RUN_DIR/after.xwd")")"
  if [ "$differing" -lt "$WINE_PIXEL_FLOOR" ]; then
    record wine-gui-input FAIL "frames differ in ${differing} pixels, under the ${WINE_PIXEL_FLOOR} floor — a blinking caret alone clears 'the frames differ', so a change this small is not evidence the app received anything"
    return
  fi
  record wine-gui-input PASS "window ${window} rendered ${colors}+ colors, then ${differing} pixels changed under ${WINE_KEYSTROKES} keystrokes from ${UINPUT_EVENT}"
}

self_test_cleanup() {
  local pid
  exec 9>&- || true
  for pid in "${WINE_PID:-}" "${XEV_PID:-}" "${UINPUT_PID:-}" "${XORG_PID:-}"; do
    if [ -n "$pid" ]; then kill "$pid" 2>/dev/null || true; fi
  done
  wineserver -k >/dev/null 2>&1 || true
}

self_test() {
  trap self_test_cleanup EXIT
  export DISPLAY="$DISPLAY_ID"

  start_uinput_device
  write_xorg_conf "$UINPUT_EVENT"
  start_xorg || die "Xorg did not come up on ${DISPLAY_ID} (see ${XORG_LOG})"
  start_receiver

  claim_gpu_render
  claim_input_lands
  claim_wine_gui_input

  if [ "$CLAIMS_NOT_PASSED" -gt 0 ]; then
    log "self-test FAILED — ${CLAIMS_NOT_PASSED} of ${CLAIMS_TOTAL} claims did not PASS"
    exit 1
  fi
  log "self-test PASSED — all ${CLAIMS_TOTAL} claims PASS"
}

assert_wineprefix_ready() {
  [ -n "${WINEPREFIX:-}" ] || return 0
  [ -f "${WINEPREFIX}/system.reg" ] && return 0
  if [ "${ESO_RIG_ALLOW_PREFIX_INIT:-}" = "1" ]; then
    log "WINEPREFIX ${WINEPREFIX} is uninitialised — proceeding because ESO_RIG_ALLOW_PREFIX_INIT=1"
    return 0
  fi
  die "WINEPREFIX ${WINEPREFIX} has no system.reg, so Wine would initialise a fresh prefix and mint a NEW machine identity against the ESO account. If this is a deliberate first run, set ESO_RIG_ALLOW_PREFIX_INIT=1. If it is not, the persistent prefix has been lost (a node reimage wipes EPHEMERAL) and must be restored rather than regenerated."
}

run_server() {
  assert_wineprefix_ready
  write_xorg_conf "$INPUT_DEVICE"
  log "starting Xorg on ${DISPLAY_ID} at ${GEOMETRY}; server log at ${XORG_LOG}"
  exec Xorg "$DISPLAY_ID" -config "$XORG_CONF" -logfile "$XORG_LOG" -noreset -nolisten tcp
}

main() {
  mkdir -p "$RUN_DIR"
  case "${1:-}" in
    --self-test) self_test ;;
    "") run_server ;;
    *) die "unknown argument '$1' — expected --self-test or no argument" ;;
  esac
}

main "$@"
