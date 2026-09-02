import { ran } from "@akasha/utils-run/running"

export const WATCHER_UNIT = "temper-watcher.service"

export function isUnitActive(): boolean {
  return ran(["systemctl", "--user", "is-active", WATCHER_UNIT]).code === 0
}

export function restartUnit(): string | null {
  const done = ran(["systemctl", "--user", "restart", WATCHER_UNIT])
  if (done.code === 0) return null
  const err = done.err.trim()
  const out = done.out.trim()
  const detail = err !== "" ? err : out !== "" ? out : "and said nothing"
  return `systemctl --user restart ${WATCHER_UNIT} answered ${String(done.code)} — ${detail}`
}

export function unitMainPid(): number | null {
  const done = ran(["systemctl", "--user", "show", "-p", "MainPID", "--value", WATCHER_UNIT])
  if (done.code !== 0) return null
  const pid = Number.parseInt(done.out.trim(), 10)
  return Number.isFinite(pid) && pid > 0 ? pid : null
}
