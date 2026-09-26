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
  })

  return total > 0 && current < total
}
