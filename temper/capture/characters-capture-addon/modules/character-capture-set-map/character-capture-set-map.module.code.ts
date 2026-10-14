import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

const SET_PLACES: { [esoSetId: number]: number | undefined } = {}
for (const one of $pagesOfType<Pick<TemperSet, "esoSetId" | "hashPlace">>(temperSet)) {
  if (one.esoSetId !== 0) SET_PLACES[one.esoSetId] = one.hashPlace
}

export function getSetIndex(esoSetId: number): number {
  return SET_PLACES[esoSetId] ?? 0
}
