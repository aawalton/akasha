import {
  asGlobalTable,
  asTyped,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import "akasha/temper/addon/type/sets-api/sets-api.type-declaration.d.ts"

export const lib = asTyped<SetsApi>({})

asGlobalTable(globalThis).TemperItemsCraftingSets = lib
