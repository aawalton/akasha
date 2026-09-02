import {
  CALLBACK_LOG_ADDED,
  CALLBACK_LOG_CLEARED,
  CALLBACK_LOG_PRUNED,
} from "../debug-logger-constants/debug-logger-constants.module.code.ts"
import { lib } from "../debug-logger-state/debug-logger-state.module.code.ts"

export function initCallbacks(): undefined {
  lib.callback.LOG_CLEARED = CALLBACK_LOG_CLEARED
  lib.callback.LOG_PRUNED = CALLBACK_LOG_PRUNED
  lib.callback.LOG_ADDED = CALLBACK_LOG_ADDED
}
