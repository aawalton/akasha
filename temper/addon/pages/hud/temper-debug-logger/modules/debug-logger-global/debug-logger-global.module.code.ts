import type { GlobalTable } from "akasha/temper/addon/pages/hud/temper-debug-logger/modules/debug-logger-casts/debug-logger-casts.module.code.ts"
import { DEBUG_LOGGER_GLOBAL } from "akasha/temper/addon/pages/hud/temper-debug-logger/modules/debug-logger-constants/debug-logger-constants.module.code.ts"
import { LIB } from "akasha/temper/addon/pages/hud/temper-debug-logger/modules/debug-logger-state/debug-logger-state.module.code.ts"

const globalTable = globalThis as GlobalTable

globalTable[DEBUG_LOGGER_GLOBAL] = LIB
