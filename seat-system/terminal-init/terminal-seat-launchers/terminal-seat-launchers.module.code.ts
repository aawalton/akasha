import {
  DEFAULT_ACCOUNT,
  envScrubShell,
  launchModeFlags,
  scopeShell,
  serverOptionShell,
  supervisorEntryShell,
} from "../../seat-launching/seat-launching.module.code.ts"
import { HANDLER } from "../../seat-naming/seat-naming.module.code.ts"
import {
  personaDocumentGateLines,
  personaDocumentStandsShell,
  personDocumentStandsShell,
} from "../document-standing/document-standing.module.code.ts"
import {
  AKASHA,
  PROXY,
  ROOT_LOCAL,
  SEAT_RESUME,
  SEAT_START_DIR,
  SUPERVISOR,
} from "../terminal-entry-points/terminal-entry-points.module.code.ts"
import { implName } from "../terminal-reload/terminal-reload.module.code.ts"
import {
  INTERACTIVE_PRINCIPAL,
  payloadEscapeLines,
  resolveTokensLines,
  SEAT_COMMAND_REL,
  spelledSeatNameLines,
  stateSeatFromRowLines,
} from "../terminal-seat-stating/terminal-seat-stating.module.code.ts"

export const TMUX_LAUNCH_FN = "_akasha_tmux_launch"

export const SEAT_LIVE_FN = "_akasha_seat_live"

export const TMUX_SERVER_COMM = "tmux: server"

const INTERACTIVE_MODE_FLAGS = launchModeFlags(false)
  .map((one) => ` ${one}`)
  .join("")

export function tmuxServerCountShell(): string {
  return `pgrep -x '${TMUX_SERVER_COMM}' 2>/dev/null | wc -l`
}

export function seatLiveFnLines(): readonly string[] {
  return [
    `${SEAT_LIVE_FN}() {`,
    `  tmux has-session -t "=$1" 2>/dev/null || return 1`,
    `  case "$(tmux list-panes -s -t "=$1" -F '#{pane_dead}' 2>/dev/null)" in`,
    "    *0*) return 0 ;;",
    "  esac",
    "  return 1",
    "}",
  ]
}

export function tmuxLaunchFnLines(): readonly string[] {
  return [
    `${TMUX_LAUNCH_FN}() {`,
    '  local _seat="$1"',
    "  shift 1",
    `  ${ROOT_LOCAL}`,
    `  if [ ! -d "${SEAT_START_DIR}" ]; then`,
    `    echo "${SEAT_START_DIR} is not there, so this seat has nowhere to start." >&2`,
    "    return 1",
    "  fi",
    `  local _cmd=(${supervisorEntryShell(PROXY, SUPERVISOR)}${INTERACTIVE_MODE_FLAGS})`,
    '  _cmd+=("$@")',
    "  if ! command -v tmux >/dev/null 2>&1; then",
    '    echo "tmux is not installed, and a seat is a tmux session, so this one has nowhere to start." >&2',
    "    return 1",
    "  fi",
    `  if tmux has-session -t "=$_seat" 2>/dev/null && ! ${SEAT_LIVE_FN} "$_seat"; then`,
    '    echo "the tmux session holding \x27$_seat\x27 has only a dead pane; stopping it, ' +
      'then starting a new one." >&2',
    '    tmux kill-session -t "=$_seat" 2>/dev/null || {',
    '      echo "the dead tmux session holding \x27$_seat\x27 would not stop, so nothing ' +
      'was started." >&2',
    "      return 1",
    "    }",
    "  fi",
    "  if ! tmux list-sessions >/dev/null 2>&1 && " +
      `[ "$(${tmuxServerCountShell()})" -gt 0 ]; then`,
    '    echo "a tmux server is running that this socket does not reach, so the seats on it are ' +
      "already stranded; starting another server here would strand them for good. Nothing was " +
      'started." >&2',
    "    return 1",
    "  fi",
    '  if ! tmux has-session -t "=$_seat" 2>/dev/null; then',
    '    local _unit="tmux-seat-$_seat-$(date +%s%3N)"',
    "    local _scope=()",
    "    if command -v systemd-run >/dev/null 2>&1; then",
    `      _scope=(${scopeShell('"--unit=$_unit"')})`,
    "    else",
    '      echo "no systemd-run, so this tmux server is starting inside this terminal\x27s own cgroup and will be killed when the editor quits." >&2',
    "    fi",
    `    "\${_scope[@]}" tmux ${serverOptionShell()} \\; new-session -d -s "$_seat" -c "${SEAT_START_DIR}" -- ` +
      `${envScrubShell()} "\${_cmd[@]}" || return 1`,
    "  fi",
    '  tmux attach-session -t "=$_seat"',
    "}",
  ]
}

function flagLines(name: string, withForce = false): readonly string[] {
  return [
    ...(withForce ? [`  local _${name}_force=0`] : []),
    `  local _${name}_argv=() _${name}_flag`,
    `  for _${name}_flag in "$@"; do`,
    `    case "$_${name}_flag" in`,
    ...(withForce ? [`      --force) _${name}_force=1 ;;`] : []),
    `      *) _${name}_argv+=("$_${name}_flag") ;;`,
    "    esac",
    "  done",
    `  set -- "\${_${name}_argv[@]}"`,
  ]
}

function handlerForPersonLines(name: string, only: boolean): readonly string[] {
  const lone = only ? '[ "$#" = 1 ] && ' : ""
  return [
    `  local _${name}_handler=0`,
    `  if ${lone}! { ${personaDocumentStandsShell("name")}; } && ` +
      `{ ${personDocumentStandsShell("name")}; }; then`,
    `    _${name}_handler=1`,
    "  fi",
  ]
}

function seatNameSplitLines(name: string): readonly string[] {
  return [
    `  if [ "$#" = 1 ] && [ "$name" != "\${name%%-*}" ] && ` +
      `[ -f "$_root/${SEAT_COMMAND_REL}" ] && ` +
      `! { ${personaDocumentStandsShell("name")}; }; then`,
    `    set -- "\${name%%-*}" "\${name#*-}"`,
    '    name="$1"',
    "  fi",
  ]
}

export function seatNewFn(name: string): string {
  return [
    `${implName(name)}() {`,
    ...flagLines(name, true),
    '  local name="$1"',
    '  if [ -z "$name" ]; then',
    `    echo "Usage: ${name} <persona> [<role>] [<domain>] [--force], or ${name} <seat-name> [--force]"`,
    "    return 1",
    "  fi",
    `  ${ROOT_LOCAL}`,
    ...seatNameSplitLines(name),
    ...handlerForPersonLines(name, true),
    ...payloadEscapeLines(name),
    `  local _${name}_typed_role="" _${name}_typed_domain="" _${name}_sorted=""`,
    `  if [ "$_${name}_handler" = 1 ]; then`,
    `    _${name}_typed_role="${HANDLER}"`,
    `    _${name}_typed_domain="$name"`,
    "  fi",
    `  if [ "$#" -gt 1 ] && [ -f "$_root/${SEAT_COMMAND_REL}" ]; then`,
    ...resolveTokensLines(name),
    `      echo "${name}: nothing was launched and nothing was stopped. Name the slots ` +
      `yourself if the sort cannot: ${name} <persona> <role> <domain>" >&2`,
    "      return 1",
    "    }",
    `    _${name}_typed_role=$(printf '%s\\n' "$_${name}_sorted" | sed -n 's/^role=//p')`,
    `    _${name}_typed_domain=$(printf '%s\\n' "$_${name}_sorted" | sed -n 's/^domain=//p')`,
    `  elif [ "$#" -gt 1 ]; then`,
    `    _${name}_typed_role="$2"`,
    "  fi",
    ...spelledSeatNameLines(name),
    `  if [ "$_${name}_handler" != 1 ]; then`,
    ...personaDocumentGateLines(name, "name"),
    "  fi",
    "  local full_aid agent_flag=()",
    `  local _${name}_stop_flags=() _${name}_stop_err _${name}_stop_rc=0`,
    `  [ "$_${name}_force" = 1 ] && _${name}_stop_flags+=(--force)`,
    `  _${name}_stop_err="/var/tmp/akasha-${name}-stop-$$.err"`,
    `  ${AKASHA} seat supervisor stop "$_${name}_seat" "\${_${name}_stop_flags[@]}" ` +
      `>/dev/null 2>"$_${name}_stop_err"`,
    `  _${name}_stop_rc=$?`,
    `  if [ "$_${name}_stop_rc" != 0 ] && [ "$_${name}_stop_rc" != 2 ]; then`,
    `    cat "$_${name}_stop_err" >&2`,
    `    rm -f "$_${name}_stop_err"`,
    `    return "$_${name}_stop_rc"`,
    "  fi",
    `  rm -f "$_${name}_stop_err"`,
    `  if [ "$_${name}_stop_rc" = 2 ] && command -v tmux >/dev/null 2>&1 && ` +
      `tmux has-session -t "=$_${name}_seat" 2>/dev/null; then`,
    `    echo "${name}: '$_${name}_seat' holds a tmux session with no seat page; stopping ` +
      `it, then starting a new seat under that name." >&2`,
    `    tmux kill-session -t "=$_${name}_seat" 2>/dev/null || {`,
    `      echo "${name}: the tmux session holding '$_${name}_seat' would not stop, so ` +
      `nothing was started." >&2`,
    "      return 1",
    "    }",
    "  fi",
    `  local _${name}_stated=(--start-mode interactive)`,
    `  [ "$_${name}_handler" = 1 ] || _${name}_stated+=(--persona "$name" ` +
      `--principal ${INTERACTIVE_PRINCIPAL})`,
    `  [ -n "$_${name}_typed_role" ] && _${name}_stated+=(--role "$_${name}_typed_role")`,
    `  [ -n "$_${name}_typed_domain" ] && ` +
      `_${name}_stated+=(--domain "$_${name}_typed_domain")`,
    `  full_aid=$(${AKASHA} seat start "\${_${name}_stated[@]}") || {`,
    `    echo "${name}: '$_${name}_seat' was not bound, so nothing was launched." >&2`,
    "    return 1",
    "  }",
    `  full_aid=$(printf '%s' "$full_aid" | cut -f1)`,
    '  if [ -z "$full_aid" ]; then',
    `    echo "${name}: '$_${name}_seat' bound no agent id, so nothing was launched." >&2`,
    "    return 1",
    "  fi",
    '  agent_flag=(--agent-id "$full_aid")',
    ...stateSeatFromRowLines(name),
    `  ${TMUX_LAUNCH_FN} "$_${name}_seat" ` + `-a ${DEFAULT_ACCOUNT} "\${agent_flag[@]}"`,
    "  local _rc=$?",
    "  return $_rc",
    "}",
  ].join("\n")
}

export function seatResumeFn(name: string): string {
  return [
    `${implName(name)}() {`,
    ...flagLines(name),
    '  local name="$1"',
    '  if [ -z "$name" ]; then',
    `    echo "Usage: ${name} <seat-name>"`,
    "    return 1",
    "  fi",
    `  ${ROOT_LOCAL}`,
    `  if command -v tmux >/dev/null 2>&1 && ${SEAT_LIVE_FN} "$name"; then`,
    `    tmux attach-session -t "=$name"`,
    "    return $?",
    "  fi",
    ...handlerForPersonLines(name, false),
    ...payloadEscapeLines(name),
    "  local full_aid full_sid",
    "  IFS=$'\\t' read -r full_aid full_sid < <(" +
      `bun run ${SEAT_RESUME} "$name" --start-mode interactive --no-launch)`,
    '  if [ -z "$full_sid" ]; then',
    `    if [ "$(${tmuxServerCountShell()})" -gt 1 ]; then`,
    `      echo "${name}: more than one tmux server is running and this socket reaches only one ` +
      `of them, so '$name' may be alive on the one it does not reach, with no way in. Nothing ` +
      `was started." >&2`,
    "    else",
    `      echo "${name}: no resumable session for seat '$name'" >&2`,
    "    fi",
    "    return 1",
    "  fi",
    ...stateSeatFromRowLines(name),
    `  ${TMUX_LAUNCH_FN} "$name" -a ${DEFAULT_ACCOUNT} -r ` +
      `--agent-id "$full_aid" --session-id "$full_sid"`,
    "  local _rc=$?",
    "  return $_rc",
    "}",
  ].join("\n")
}
