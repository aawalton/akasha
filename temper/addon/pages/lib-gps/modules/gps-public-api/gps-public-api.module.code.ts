import { asGlobalObjectTable } from "akasha/temper/addon/pages/lib-gps/modules/gps-casts/gps-casts.module.code.ts"
import { LIB_IDENTIFIER } from "akasha/temper/addon/pages/lib-gps/modules/gps-constants/gps-constants.module.code.ts"
import { lib } from "akasha/temper/addon/pages/lib-gps/modules/gps-lib-state/gps-lib-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const globals = asGlobalObjectTable(_G)
if (globals[LIB_IDENTIFIER] !== undefined) {
  error(LIB_IDENTIFIER + " is already loaded")
}
globals[LIB_IDENTIFIER] = lib
