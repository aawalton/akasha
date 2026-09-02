import type { GlobalTable } from "../async-casts/async-casts.module.code.ts"
import { lib } from "../async-state/async-state.module.code.ts"

;(globalThis as GlobalTable).LibAsync = lib
