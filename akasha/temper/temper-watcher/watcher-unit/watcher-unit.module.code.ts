import { ran } from "@akasha/utils-run/running"

export const WATCHER_UNIT = "temper-watcher.service"

export function isUnitActive(): boolean {
  return ran(["systemctl", "--user", "is-active", WATCHER_UNIT]).code === 0
}
