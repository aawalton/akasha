import {
  CALLBACK_LOG_ADDED,
  CALLBACK_LOG_CLEARED,
  CALLBACK_LOG_PRUNED,
} from "../debug-logger-constants/debug-logger-constants.module.code.ts"
import { INTERNAL, LIB } from "../debug-logger-state/debug-logger-state.module.code.ts"
import type { Lib } from "../debug-logger-types/debug-logger-types.module.code.ts"

export function initCompatibility(): undefined {
  LIB.CALLBACK_LOG_CLEARED = CALLBACK_LOG_CLEARED
  LIB.CALLBACK_LOG_PRUNED = CALLBACK_LOG_PRUNED
  LIB.CALLBACK_LOG_ADDED = CALLBACK_LOG_ADDED

  // @deprecated use LIB.SESSION_START_TIME instead
  LIB.GetSessionStartTime = function (this: Lib): number {
    return INTERNAL.SESSION_START_TIME
  }

  // @deprecated use LIB.UI_LOAD_START_TIME instead
  LIB.GetUiLoadStartTime = function (this: Lib): number {
    return INTERNAL.UI_LOAD_START_TIME
  }
}
