import type { GlobalTable } from "akasha/temper/addon/pages/characters/modules/table-function-casts/table-function-casts.module.code.ts"

import { TABLE_FUNCTIONS } from "akasha/temper/addon/pages/characters/modules/table-functions/table-functions.module.code.ts"

const LIB_GLOBAL_NAME = "TemperTableFunctions"

const GLOBALS = globalThis as GlobalTable
GLOBALS[LIB_GLOBAL_NAME] = TABLE_FUNCTIONS
