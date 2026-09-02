import {
  BASE_APPLICABLE_ESO_LINE_IDS,
  CLASS_ESO_SKILL_LINE_IDS,
  RACIAL_ESO_LINE_ID_PER_ESO_RACE,
} from "@akasha/temper-characters-capture-addon/character-capture-skill-line-groups"
import { MORPHABLE_SKILLS_DETAIL_PER_LINE } from "@akasha/temper-characters-capture-addon/character-capture-skill-line-map"
import type { SavedCharacterEntry } from "@akasha/temper-player-completion-state/completion-saved-variables"
import type { TaskProgress } from "@akasha/temper-player-completion-state/completion-task-progress"
import { computeApplicableEsoSkillLineIds } from "@akasha/temper-skill-morphs/applicable-eso-skill-lines"
import {
  computeCharacterMorphProgressByEsoId,
  type ExpectedMorphableSkill,
} from "@akasha/temper-skill-morphs/character-morph-progress-eso"
import { resolveSkillMorphProgressByPath } from "@akasha/temper-skill-morphs/skill-morph-progress-paths"

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

export function resolveSkillMorphs(
  charData: SavedCharacterEntry | undefined,
  itemPath: readonly (string | number)[] | undefined
): TaskProgress | undefined {
  const slp = charData?.skillLineProgress
  if (slp === undefined) return undefined

  if (itemPath !== undefined && itemPath.length > 0) {
    const esoLineId = Number(itemPath[0])
    const expectedSkillsForLine = expectedSkillsByEsoLineId.get(esoLineId)
    if (expectedSkillsForLine === undefined) return undefined

    let skillBaseName: string | undefined
    if (itemPath.length > 1) {
      const skillId = Number(itemPath[1])
      const baseName = slp[esoLineId]?.skills?.[skillId]?.base.name
      if (baseName === undefined) return undefined
      skillBaseName = baseName
    }

    return resolveSkillMorphProgressByPath({
      esoLineId,
      skillBaseName,
      expectedSkillsForLine,
      skillLineProgress: slp,
    })
  }

  const applicableEsoLineIds = computeApplicableEsoSkillLineIds({
    esoClassId: charData?.classId ?? 0,
    esoRaceId: charData?.raceId ?? 0,
    classLinesByEsoClassId,
    racialLineByEsoRaceId,
    baseApplicableEsoLineIds,
  })

  return computeCharacterMorphProgressByEsoId({
    applicableEsoLineIds,
    expectedSkillsByEsoLineId,
    skillLineProgress: slp,
  })
}
