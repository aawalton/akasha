import type { GlobalTable } from "akasha/temper/addon/pages/temper-core/temper-async/modules/async-casts/async-casts.module.code.ts"
import { lib } from "akasha/temper/addon/pages/temper-core/temper-async/modules/async-state/async-state.module.code.ts"

;(globalThis as GlobalTable).TemperAsync = lib
