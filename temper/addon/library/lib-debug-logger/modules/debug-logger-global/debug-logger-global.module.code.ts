import type { GlobalTable } from "akasha/temper/addon/library/lib-debug-logger/modules/debug-logger-casts/debug-logger-casts.module.code.ts"
import { LIB_IDENTIFIER } from "akasha/temper/addon/library/lib-debug-logger/modules/debug-logger-constants/debug-logger-constants.module.code.ts"
import { LIB } from "akasha/temper/addon/library/lib-debug-logger/modules/debug-logger-state/debug-logger-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const globalTable = globalThis as GlobalTable
if (globalTable[LIB_IDENTIFIER] !== undefined) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}

globalTable[LIB_IDENTIFIER] = LIB
