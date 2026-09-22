import { INTERNAL } from "akasha/temper/addon/pages/world/map-data/modules/map-data-lib-state/map-data-lib-state.module.code.ts"
import type { Internal } from "akasha/temper/addon/pages/world/map-data/modules/map-data-types/map-data-types.module.code.ts"
import {
  createAddonLog,
  type LogType,
} from "akasha/temper/addon/shared/log/modules/addon-log/addon-log.module.code.ts"

export function initLogger(this: void): undefined {
  const log = createAddonLog(INTERNAL.loggerName, function (this: void): boolean {
    return INTERNAL.show_log
  })
  INTERNAL.logger = log.logger
  INTERNAL.dm = function (this: Internal, logType: LogType, ...args: unknown[]): undefined {
    log.dm(logType, ...args)
  }
}
