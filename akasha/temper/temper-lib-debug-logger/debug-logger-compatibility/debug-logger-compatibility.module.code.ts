import "../debug-logger-declarations/debug-logger-declarations.module.code.ts"

import {
  CALLBACK_LOG_ADDED,
  CALLBACK_LOG_CLEARED,
  CALLBACK_LOG_PRUNED,
} from "../debug-logger-constants/debug-logger-constants.module.code.ts"
import { INTERNAL, lib } from "../debug-logger-state/debug-logger-state.module.code.ts"
import type { Lib } from "../debug-logger-types/debug-logger-types.module.code.ts"

export function initCompatibility(): undefined {
  lib.CALLBACK_LOG_CLEARED = CALLBACK_LOG_CLEARED
  lib.CALLBACK_LOG_PRUNED = CALLBACK_LOG_PRUNED
  lib.CALLBACK_LOG_ADDED = CALLBACK_LOG_ADDED

  // @deprecated use lib.SESSION_START_TIME instead
  lib.GetSessionStartTime = function (this: Lib): number {
    return INTERNAL.SESSION_START_TIME
  }

  // @deprecated use lib.UI_LOAD_START_TIME instead
  lib.GetUiLoadStartTime = function (this: Lib): number {
    return INTERNAL.UI_LOAD_START_TIME
  }
}
