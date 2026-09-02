import { asGlobalTable } from "../table-function-casts/table-function-casts.module.code.ts"
import { TABLE_FUNCTIONS } from "../table-functions/table-functions.module.code.ts"

const LIB_GLOBAL_NAME = "TemperTableFunctions"

const GLOBALS = asGlobalTable(globalThis)
GLOBALS[LIB_GLOBAL_NAME] = TABLE_FUNCTIONS
