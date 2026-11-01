import { isObjectRecord } from "akasha/code/type/narrowing/modules/is-object-record/is-object-record.module.code.ts"
import { getTemperCharactersData } from "akasha/temper/addon/pages/items/modules/inventory-temper-characters-data/inventory-temper-characters-data.module.code.ts"
import { applicableInputs } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-line-groups/character-capture-skill-line-groups.module.code.ts"
import { morphableSkillsDetailPerLine } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-line-map/character-capture-skill-line-map.module.code.ts"
import { computeApplicableEsoSkillLineIds } from "akasha/temper/player/skill-morph/modules/applicable-eso-skill-lines/applicable-eso-skill-lines.module.code.ts"
import {
  computeCharacterMorphProgressByEsoId,
  type ExpectedMorphableSkill,
  type MorphSkillLineProgressMap,
} from "akasha/temper/player/skill-morph/modules/character-morph-progress-eso/character-morph-progress-eso.module.code.ts"
import { addonMorphRankMost } from "akasha/temper/player/skill-morph/modules/morph-rank-pages/morph-rank-pages.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

const applicable = applicableInputs()

const expectedSkillsByEsoLineId: ReadonlyMap<
  number,
  ReadonlyArray<ExpectedMorphableSkill>
> = (() => {
  const map = new Map<number, ReadonlyArray<ExpectedMorphableSkill>>()
  const details = morphableSkillsDetailPerLine()
  for (const k of Object.keys(details)) {
    const esoLineId = Number(k)
    const skills = details[esoLineId]
    if (skills !== undefined) map.set(esoLineId, skills)
  }
  return map
})()

function isMorphSkillLineProgressMap(value: unknown): value is MorphSkillLineProgressMap {
  return isObjectRecord(value) && Object.values(value).every(isObjectRecord)
}

export function canCharacterLevelMorphs(charId: string): boolean {
  const characters = getTemperCharactersData()
  if (!characters) return false

  const charData = characters[charId]
  if (!isObjectRecord(charData)) return false

  const classIdRaw = charData["classId"]
  const raceIdRaw = charData["raceId"]
  const esoClassId = typeof classIdRaw === "number" ? classIdRaw : 0
  const esoRaceId = typeof raceIdRaw === "number" ? raceIdRaw : 0

  const slpRaw = charData["skillLineProgress"]
  const skillLineProgress = isMorphSkillLineProgressMap(slpRaw) ? slpRaw : undefined

  const applicableEsoLineIds = computeApplicableEsoSkillLineIds({
    esoClassId,
    esoRaceId,
    ...applicable,
  })

  const { current, total } = computeCharacterMorphProgressByEsoId({
    applicableEsoLineIds,
    expectedSkillsByEsoLineId,
    skillLineProgress,
    morphRankMost: addonMorphRankMost(),
  })

  return total > 0 && current < total
}

export function canCurrentCharacterBenefitFromXP(): boolean {
  if (GetPlayerChampionPointsEarned() < 3600) return true

  if (GetUnitLevel("player") < 50) return true

  const characters = getTemperCharactersData()
  if (!characters) return true

  const currentId = tostring(GetCurrentCharacterId())
  const charData = characters[currentId]
  if (!isObjectRecord(charData)) return true

  const skillLineProgress = charData["skillLineProgress"]
  if (!isObjectRecord(skillLineProgress)) return true

  for (const slEntry of Object.values(skillLineProgress)) {
    if (!isObjectRecord(slEntry)) continue
    const skills = slEntry["skills"]
    if (!isObjectRecord(skills)) continue
    for (const skillEntry of Object.values(skills)) {
      if (!isObjectRecord(skillEntry)) continue
      for (const morphKey of ["base", "morph1", "morph2"] as const) {
        const morphData = skillEntry[morphKey]
        if (!isObjectRecord(morphData)) continue
        const rank = morphData["rank"]
        if (typeof rank === "number" && rank < 4) return true
      }
    }
  }

  return false
}
