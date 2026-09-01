export const APP_STAMP_MARKER = "NATIVE_SHELL_APP_COMMIT"
export const WIDGET_STAMP_MARKER = "NATIVE_SHELL_WIDGET_COMMIT"
export const STAMP_GATE_OK = "MOBILE_DEPLOY_TESTFLIGHT_STAMP_OK"

export function buildStampGate(opts: {
  readonly ipa: string
  readonly expectedCommit: string
}): readonly string[] {
  return [
    `echo "== build-stamp gate: reading the commit out of the compiled binaries =="`,
    `STAMP_EXPECTED=${opts.expectedCommit}`,
    `STAMP_WORK=$(mktemp -d)`,
    `unzip -q -o ${opts.ipa} -d "$STAMP_WORK"`,
    `STAMP_APP_BUNDLE=$(ls -d "$STAMP_WORK"/Payload/*.app 2>/dev/null | head -1 || true)`,
    `if [ -z "$STAMP_APP_BUNDLE" ]; then`,
    `  echo "BUILD-STAMP GATE: REFUSED — the exported .ipa holds no .app, so no compiled binary could be read." >&2`,
    `  rm -rf "$STAMP_WORK"`,
    `  exit 1`,
    `fi`,
    `STAMP_FAILED=0`,
    `stamp_check() {`,
    `  stamp_actual=$(strings -a "$2" 2>/dev/null | grep -o "$3=[0-9a-f]\\{40\\}" | head -1 | cut -d= -f2 || true)`,
    `  if [ -z "$stamp_actual" ]; then`,
    `    echo "BUILD-STAMP GATE: REFUSED — the $1 binary carries no $3 stamp at all. It was compiled from a checkout the seam never stamped, so what it contains cannot be established." >&2`,
    `    STAMP_FAILED=1`,
    `  elif [ "$stamp_actual" != "$STAMP_EXPECTED" ]; then`,
    `    echo "BUILD-STAMP GATE: REFUSED — the $1 binary was compiled from $stamp_actual, but this cut ships $STAMP_EXPECTED." >&2`,
    `    STAMP_FAILED=1`,
    `  else`,
    `    echo "OK: the $1 binary carries $stamp_actual"`,
    `  fi`,
    `}`,
    `stamp_check "app" "$STAMP_APP_BUNDLE/$(basename "$STAMP_APP_BUNDLE" .app)" ${APP_STAMP_MARKER}`,
    `for stamp_appex in "$STAMP_APP_BUNDLE"/PlugIns/*.appex; do`,
    `  [ -d "$stamp_appex" ] || continue`,
    `  stamp_check "widget extension $(basename "$stamp_appex")" "$stamp_appex/$(basename "$stamp_appex" .appex)" ${WIDGET_STAMP_MARKER}`,
    `done`,
    `rm -rf "$STAMP_WORK"`,
    `if [ "$STAMP_FAILED" != 0 ]; then`,
    `  echo "BUILD-STAMP GATE: upload REFUSED. The archive does not carry the commit this cut is shipping, so installing it would put code on the device that no record describes. Re-cut without --no-sync and without NATIVE_SHELL_WIDGET=0." >&2`,
    `  exit 1`,
    `fi`,
    `echo "${STAMP_GATE_OK}"`,
  ]
}
