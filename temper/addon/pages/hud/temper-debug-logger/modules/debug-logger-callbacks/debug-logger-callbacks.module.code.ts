import {
  CALLBACK_LOG_ADDED,
  CALLBACK_LOG_CLEARED,
  CALLBACK_LOG_PRUNED,
} from "akasha/temper/addon/pages/hud/temper-debug-logger/modules/debug-logger-constants/debug-logger-constants.module.code.ts"
import { LIB } from "akasha/temper/addon/pages/hud/temper-debug-logger/modules/debug-logger-state/debug-logger-state.module.code.ts"

export function initCallbacks(): undefined {
  LIB.callback.LOG_CLEARED = CALLBACK_LOG_CLEARED
  LIB.callback.LOG_PRUNED = CALLBACK_LOG_PRUNED
  LIB.callback.LOG_ADDED = CALLBACK_LOG_ADDED
}
