import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.ts"
import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

type Places = { [esoSkillId: string]: number | undefined }

let starPlaces: Places | undefined

function starPlacesOf(this: void): Places {
  const found: Places = {}
  for (const one of $pagesOfType<Pick<TemperChampionStar, "esoChampionSkillId" | "hashPlace">>(
    temperChampionStar
  )) {
    if (one.esoChampionSkillId !== 0) found[`${one.esoChampionSkillId}`] = one.hashPlace
  }
  return found
}

export function getChampionPointIndex(esoSkillId: number): number {
  starPlaces ??= starPlacesOf()
  return starPlaces[`${esoSkillId}`] ?? -1
}
