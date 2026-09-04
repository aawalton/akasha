import type { MobileApp } from "../mobile-app/mobile-app.module.code.ts"

export const BUILD_NUMBER_MARKER_PREFIX = "MOBILE_DEPLOY_TESTFLIGHT_BUILD_NUMBER="

const LOCK_CEILING_SECONDS = 1800
const LOCK_POLL_SECONDS = 5
const LOCK_STALE_MIN_AGE_SECONDS = 45

export function buildAcquireMacBuildLock(app: MobileApp): string {
  return [
    "# ── acquire the mac build mutex (akasha deploy concurrency, #14174) ──",
    `mkdir -p "$(dirname "${app.macBuildLockDir}")"`,
    "_lock_waited=0",
    "while :; do",
    `  if mkdir "${app.macBuildLockDir}" 2>/dev/null; then`,
    `    echo "$$" > "${app.macBuildLockDir}/pid"`,
    '    echo "[mutex] acquired mac build lock (pid $$)"',
    "    break",
    "  fi",
    `  _holder="$(cat "${app.macBuildLockDir}/pid" 2>/dev/null || true)"`,
    '  if [ -n "$_holder" ] && ! kill -0 "$_holder" 2>/dev/null; then',
    '    _now="$(date +%s)"',
    `    _mtime="$(stat -f %m "${app.macBuildLockDir}" 2>/dev/null || echo "$_now")"`,
    "    _age=$(( _now - _mtime ))",
    `    if [ "$_age" -ge ${LOCK_STALE_MIN_AGE_SECONDS} ]; then`,
    '      echo "[mutex] stealing stale lock (dead pid $_holder, age ${_age}s)"',
    `      rm -rf "${app.macBuildLockDir}" 2>/dev/null || true`,
    "      continue",
    "    fi",
    "  fi",
    `  if [ "$_lock_waited" -ge ${LOCK_CEILING_SECONDS} ]; then`,
    `    echo "CONCURRENT_BUILD_MUTATION: could not acquire the mac build lock within ${LOCK_CEILING_SECONDS}s (held by pid \${_holder:-unknown} at ${app.macBuildLockDir})"`,
    "    exit 3",
    "  fi",
    `  echo "[mutex] mac build lock held by pid \${_holder:-?}; waiting ${LOCK_POLL_SECONDS}s (waited \${_lock_waited}s)"`,
    `  sleep ${LOCK_POLL_SECONDS}`,
    `  _lock_waited=$(( _lock_waited + ${LOCK_POLL_SECONDS} ))`,
    "done",
  ].join("\n")
}

export function buildReleaseMacBuildLock(app: MobileApp): string {
  return [
    `rm -rf "${app.macBuildLockDir}" 2>/dev/null || true`,
    'echo "[mutex] released mac build lock"',
  ].join("\n")
}

export function buildChooseBuildNumber(opts: {
  readonly app: MobileApp
  readonly explicit?: number
  readonly ascFloor: number
}): string {
  const lines: string[] = [
    "# ── choose the TestFlight build number (under the mac build lock, #14174) ──",
    `_counter="$(cat "${opts.app.macBuildNumberFile}" 2>/dev/null || echo 0)"`,
    "case \"$_counter\" in ''|*[!0-9]*) _counter=0 ;; esac",
    `_asc_floor=${opts.ascFloor}`,
  ]
  if (opts.explicit === undefined) {
    lines.push(
      'if [ "$_counter" -gt "$_asc_floor" ]; then _base="$_counter"; else _base="$_asc_floor"; fi',
      "BUILD_NUMBER=$(( _base + 1 ))"
    )
  } else {
    lines.push(`BUILD_NUMBER=${opts.explicit}`)
  }
  lines.push(
    `echo "${BUILD_NUMBER_MARKER_PREFIX}$BUILD_NUMBER"`,
    'echo "[build-number] chose CURRENT_PROJECT_VERSION=$BUILD_NUMBER (counter is $_counter, asc floor $_asc_floor) — the counter advances only once this number is uploaded"'
  )
  return lines.join("\n")
}

export function buildReserveBuildNumber(app: MobileApp): string {
  return [
    "# ── the upload succeeded, so the number is now spent: advance the durable counter ──",
    `_reserved="$(cat "${app.macBuildNumberFile}" 2>/dev/null || echo 0)"`,
    "case \"$_reserved\" in ''|*[!0-9]*) _reserved=0 ;; esac",
    `if [ "$_reserved" -lt "$BUILD_NUMBER" ]; then`,
    `  mkdir -p "$(dirname "${app.macBuildNumberFile}")"`,
    `  echo "$BUILD_NUMBER" > "${app.macBuildNumberFile}"`,
    '  echo "[build-number] reserved $BUILD_NUMBER (counter was $_reserved) — spent by a completed upload"',
    "else",
    '  echo "[build-number] counter already at $_reserved, at or past $BUILD_NUMBER — left alone"',
    "fi",
  ].join("\n")
}

export function parseAssignedBuildNumber(out: string): number | undefined {
  let found: number | undefined
  for (const line of out.split("\n")) {
    const trimmed = line.trim()
    if (trimmed.startsWith(BUILD_NUMBER_MARKER_PREFIX)) {
      const n = Number.parseInt(trimmed.slice(BUILD_NUMBER_MARKER_PREFIX.length), 10)
      if (Number.isFinite(n) && n > 0) found = n
    }
  }
  return found
}
