import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.ts"
import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

type Places = {
  readonly byAbility: { [esoSkillId: number]: number | undefined }
  readonly count: number
}

let held: Places | undefined

function placesOf(this: void): Places {
  const byAbility: { [esoSkillId: number]: number | undefined } = {}
  let count = 0
  for (const one of $pagesOfType<Pick<TemperClassMastery, "esoSkillId" | "hashPlace">>(
    temperClassMastery
  )) {
    byAbility[one.esoSkillId] = one.hashPlace
    count += 1
  }
  return { byAbility, count }
}

export function classMasteryPlace(abilityId: number): number | undefined {
  held ??= placesOf()
  return held.byAbility[abilityId]
}

export function classMasteryCount(): number {
  held ??= placesOf()
  return held.count
}
