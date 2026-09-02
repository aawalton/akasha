import {
  BASE_APPLICABLE_ESO_LINE_IDS,
  CLASS_ESO_SKILL_LINE_IDS,
  RACIAL_ESO_LINE_ID_PER_ESO_RACE,
} from "@akasha/temper-characters-capture-addon/character-capture-skill-line-groups"
import { MORPHABLE_SKILLS_DETAIL_PER_LINE } from "@akasha/temper-characters-capture-addon/character-capture-skill-line-map"
import { computeApplicableEsoSkillLineIds } from "@akasha/temper-skill-morphs/applicable-eso-skill-lines"
import {
  computeCharacterMorphProgressByEsoId,
  type ExpectedMorphableSkill,
  type MorphSkillLineProgressMap,
} from "@akasha/temper-skill-morphs/character-morph-progress-eso"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"
import { getTemperCharactersData } from "../inventory-temper-characters-data/inventory-temper-characters-data.module.code.ts"

const baseApplicableEsoLineIds: ReadonlySet<number> = (() => {
  const set = new Set<number>()
  for (const k of Object.keys(BASE_APPLICABLE_ESO_LINE_IDS)) {
    set.add(Number(k))
  }
  return set
})()

const classLinesByEsoClassId: ReadonlyMap<number, readonly number[]> = (() => {
  const map = new Map<number, readonly number[]>()
  for (const k of Object.keys(CLASS_ESO_SKILL_LINE_IDS)) {
    const esoClassId = Number(k)
    const lines = CLASS_ESO_SKILL_LINE_IDS[esoClassId]
    if (lines !== undefined) map.set(esoClassId, lines)
  }
  return map
})()

const racialLineByEsoRaceId: ReadonlyMap<number, number> = (() => {
  const map = new Map<number, number>()
  for (const k of Object.keys(RACIAL_ESO_LINE_ID_PER_ESO_RACE)) {
    const esoRaceId = Number(k)
    const line = RACIAL_ESO_LINE_ID_PER_ESO_RACE[esoRaceId]
    if (line !== undefined) map.set(esoRaceId, line)
  }
  return map
})()

const expectedSkillsByEsoLineId: ReadonlyMap<
  number,
  ReadonlyArray<ExpectedMorphableSkill>
> = (() => {
  const map = new Map<number, ReadonlyArray<ExpectedMorphableSkill>>()
  for (const k of Object.keys(MORPHABLE_SKILLS_DETAIL_PER_LINE)) {
    const esoLineId = Number(k)
    const skills = MORPHABLE_SKILLS_DETAIL_PER_LINE[esoLineId]
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
    classLinesByEsoClassId,
    racialLineByEsoRaceId,
    baseApplicableEsoLineIds,
  })

  const { current, total } = computeCharacterMorphProgressByEsoId({
    applicableEsoLineIds,
    expectedSkillsByEsoLineId,
    skillLineProgress,
  })

  return total > 0 && current < total
}
