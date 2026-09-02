import "../debug-logger-declarations/debug-logger-declarations.module.code.ts"

import { asGlobalTable } from "../debug-logger-casts/debug-logger-casts.module.code.ts"
import { LIB_IDENTIFIER } from "../debug-logger-constants/debug-logger-constants.module.code.ts"
import { lib } from "../debug-logger-state/debug-logger-state.module.code.ts"
import type { Lib } from "../debug-logger-types/debug-logger-types.module.code.ts"

declare global {
  var LibDebugLogger: Lib | undefined
}

const globalTable = asGlobalTable(globalThis)
if (globalTable[LIB_IDENTIFIER] !== undefined) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}

globalThis.LibDebugLogger = lib
