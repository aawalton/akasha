import { ADDON_NAME } from "akasha/temper/addon/pages/world/modules/destinations-names/destinations-names.module.code.ts"
import {
  createAddonLog,
  type LogType,
} from "akasha/temper/addon/shared/log/modules/addon-log/addon-log.module.code.ts"

const LOG = createAddonLog(ADDON_NAME, function (this: void): boolean {
  return true
})

export function dm(logType: LogType, ...args: unknown[]): undefined {
  LOG.dm(logType, ...args)
}
