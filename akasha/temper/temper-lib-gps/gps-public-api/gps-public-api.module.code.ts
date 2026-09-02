import { asGlobalObjectTable } from "../gps-casts/gps-casts.module.code.ts"
import { LIB_IDENTIFIER } from "../gps-constants/gps-constants.module.code.ts"
import { lib } from "../gps-lib-state/gps-lib-state.module.code.ts"

const globals = asGlobalObjectTable(_G)
if (globals[LIB_IDENTIFIER] !== undefined) {
  error(LIB_IDENTIFIER + " is already loaded")
}
globals[LIB_IDENTIFIER] = lib
