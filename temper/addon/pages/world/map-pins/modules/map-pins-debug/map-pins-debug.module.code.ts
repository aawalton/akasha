import type { Lib } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-types/map-pins-types.module.code.ts"
import {
  type AddonLog,
  createAddonLog,
  type LogType,
} from "akasha/temper/addon/shared/log/modules/addon-log/addon-log.module.code.ts"

let LOG: AddonLog | undefined

function logFor(lib: Lib): AddonLog {
  if (LOG === undefined) {
    LOG = createAddonLog(lib.loggerName, function (this: void): boolean {
      return lib.show_log
    })
  }
  return LOG
}

export function initDebug(lib: Lib): undefined {
  const logger = logFor(lib).logger
  if (logger !== undefined) {
    lib.logger = logger
  }
}

export function dm(lib: Lib, logType: LogType, ...args: unknown[]): undefined {
  logFor(lib).dm(logType, ...args)
}
