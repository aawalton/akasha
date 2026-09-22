import type { GlobalTable } from "akasha/temper/addon/pages/hud/temper-async/modules/async-casts/async-casts.module.code.ts"

import { ASYNC_DEFAULT_STALL_THRESHOLD } from "akasha/temper/addon/pages/hud/temper-async/modules/async-constants/async-constants.module.code.ts"
import { S } from "akasha/temper/addon/pages/hud/temper-async/modules/async-state/async-state.module.code.ts"
import "akasha/temper/addon/pages/hud/temper-async/async-saved-vars-declarations/async-saved-vars-declarations.type-declaration.d.ts"

export function initSavedVar(this: void): undefined {
  const glob = globalThis as GlobalTable

  const sv = glob.AsyncSavedVars ?? {}
  glob.AsyncSavedVars = sv

  const threshold = sv.ASYNC_STALL_THRESHOLD ?? ASYNC_DEFAULT_STALL_THRESHOLD
  sv.ASYNC_STALL_THRESHOLD = threshold

  S.asyncStallThreshold = threshold
}

globalThis.InitSavedVar = initSavedVar
