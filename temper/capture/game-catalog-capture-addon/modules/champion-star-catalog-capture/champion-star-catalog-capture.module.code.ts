import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import type {
  ChampionStarCatalogData,
  ChampionStarCatalogEntry,
} from "akasha/temper/capture/shape/modules/champion-star-catalog/champion-star-catalog.module.code.ts"
import { registerCatalogDomain } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"

function championStarEntry(this: void, esoChampionSkillId: number): ChampionStarCatalogEntry {
  const entry: ChampionStarCatalogEntry = {
    esoChampionSkillId,
    maxPoints: GetChampionSkillMaxPoints(esoChampionSkillId),
    isSlottable: CanChampionSkillTypeBeSlotted(GetChampionSkillType(esoChampionSkillId)),
  }
  if (!DoesChampionSkillHaveJumpPoints(esoChampionSkillId)) return entry
  const jumpPoints: number[] = [...GetChampionSkillJumpPoints(esoChampionSkillId)]
  return { ...entry, jumpPoints }
}

function collectChampionStarCatalog(this: void, onComplete: (this: void) => void): undefined {
  const stars: ChampionStarCatalogData = {}
  let disciplineIndex = 1
  while (true) {
    const count = GetNumChampionDisciplineSkills(disciplineIndex)
    if (count === 0) break
    for (let skillIndex = 1; skillIndex <= count; skillIndex++) {
      const esoChampionSkillId = GetChampionSkillId(disciplineIndex, skillIndex)
      if (esoChampionSkillId !== 0)
        stars[esoChampionSkillId] = championStarEntry(esoChampionSkillId)
    }
    disciplineIndex++
  }
  getSavedVariables().championStarCatalog = stars
  onComplete()
  return undefined
}

registerCatalogDomain({ key: "championStarCatalog", collect: collectChampionStarCatalog })
