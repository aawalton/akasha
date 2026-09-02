import { asGlobalTable } from "../async-casts/async-casts.module.code.ts"
import { ASYNC_DEFAULT_STALL_THRESHOLD } from "../async-constants/async-constants.module.code.ts"
import { S } from "../async-state/async-state.module.code.ts"
import type { AsyncSavedVarsTable } from "../async-types/async-types.module.code.ts"

export function initSavedVar(this: void): undefined {
  const glob = asGlobalTable(globalThis)

  const sv = glob.AsyncSavedVars ?? {}
  glob.AsyncSavedVars = sv

  const threshold = sv.ASYNC_STALL_THRESHOLD ?? ASYNC_DEFAULT_STALL_THRESHOLD
  sv.ASYNC_STALL_THRESHOLD = threshold

  S.asyncStallThreshold = threshold
}

globalThis.InitSavedVar = initSavedVar

declare global {
  var AsyncSavedVars: AsyncSavedVarsTable | undefined
  var InitSavedVar: (this: void) => void
}
