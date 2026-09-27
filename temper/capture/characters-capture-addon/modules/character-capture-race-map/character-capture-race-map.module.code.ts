import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { noRace } from "akasha/temper/catalog/world/temper-race/pages/no-race.temper-race.ts"
import { temperRace } from "akasha/temper/catalog/world/temper-race/temper-race.page-type.ts"
import type { TemperRace } from "akasha/temper/catalog/world/temper-race/temper-race.page-type.types.ts"

type Places = { [esoRaceId: number]: number | undefined }

let held: Places | undefined

function placesOf(this: void): Places {
  const found: Places = {}
  for (const one of $pagesOfType<Pick<TemperRace, "esoRaceId" | "hashPlace">>(temperRace)) {
    found[one.esoRaceId] = one.hashPlace
  }
  return found
}

export function getRaceIndex(esoRaceId: number): number {
  held ??= placesOf()
  return held[esoRaceId] ?? noRace.hashPlace
}
