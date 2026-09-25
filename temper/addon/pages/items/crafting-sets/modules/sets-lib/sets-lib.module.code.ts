import { asGlobalTable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import "akasha/temper/addon/type/sets-api/sets-api.type-declaration.d.ts"

function newLibraryTable(this: void): SetsApi {
  return {} as SetsApi
}

export const lib = newLibraryTable()

asGlobalTable(globalThis).TemperItemsCraftingSets = lib
