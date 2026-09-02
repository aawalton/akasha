import type { Lib } from "../table-function-types/table-function-types.module.code.ts"
import { TABLE_FUNCTIONS } from "../table-functions/table-functions.module.code.ts"

declare global {
  var TemperTableFunctions: Lib
}

globalThis.TemperTableFunctions = TABLE_FUNCTIONS
