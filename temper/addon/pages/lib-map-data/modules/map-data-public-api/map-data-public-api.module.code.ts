import { asGlobalObjectTable } from "akasha/temper/addon/pages/lib-map-data/modules/map-data-casts/map-data-casts.module.code.ts"
import {
  INTERNAL_IDENTIFIER,
  LIB_IDENTIFIER,
} from "akasha/temper/addon/pages/lib-map-data/modules/map-data-constants/map-data-constants.module.code.ts"
import {
  INTERNAL,
  LIB,
} from "akasha/temper/addon/pages/lib-map-data/modules/map-data-lib-state/map-data-lib-state.module.code.ts"
import { PSEUDO_MAP_INDICES } from "akasha/temper/addon/pages/lib-map-data/modules/map-data-pseudo-indices/map-data-pseudo-indices.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const globals = asGlobalObjectTable(_G)
globals[LIB_IDENTIFIER] = LIB
globals[INTERNAL_IDENTIFIER] = INTERNAL

for (const [pseudoName, pseudoIndex] of pairs(PSEUDO_MAP_INDICES)) {
  globals[pseudoName] = pseudoIndex
}
