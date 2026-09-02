import { getRacialSkillLineIdForRace } from "@akasha/temper-character-skills/passive-queries"
import { classes } from "@akasha/temper-classes/character-class"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import { type RaceId, races } from "@akasha/temper-races/races"
import { skillLineCategoriesSorted } from "@akasha/temper-skill-lines/skill-line-category-data"
import {
  getSkillLineIdsForClass,
  type SkillLineId,
  skillLines,
} from "@akasha/temper-skill-lines/skill-lines"

export const ESO_CLASS_ID_TO_CLASS_ID = new Map<number, ClassId>(
  classes.list
    .filter((cls) => cls.esoClassId !== 0)
    .map((cls): [number, ClassId] => [cls.esoClassId, cls.id])
)

export const ESO_RACE_ID_TO_RACE_ID = new Map<number, RaceId>(
  races.list
    .filter((race) => race.esoRaceId !== 0)
    .map((race): [number, RaceId] => [race.esoRaceId, race.id])
)

export const ESO_SKILL_LINE_ID_TO_SKILL_LINE_ID = new Map<number, SkillLineId>(
  skillLines.list
    .filter((sl) => sl.esoSkillLineId !== 0)
    .map((sl): [number, SkillLineId] => [sl.esoSkillLineId, sl.id])
)

export const EXCLUDED_CATEGORIES = new Set(["none", "companion"])
export const EXCLUDED_SKILL_LINES = new Set(["no-skill-line", "alliance-war-emperor"])

export function getApplicableSkillLineIds(classId: ClassId, raceId: RaceId): Set<SkillLineId> {
  const result = new Set<SkillLineId>()

  for (const category of skillLineCategoriesSorted) {
    if (EXCLUDED_CATEGORIES.has(category.id)) continue

    if (category.id === "class") {
      for (const slId of getSkillLineIdsForClass(classId)) {
        result.add(slId)
      }
    } else if (category.id === "racial") {
      const slId = getRacialSkillLineIdForRace(raceId)
      if (slId != null && !EXCLUDED_SKILL_LINES.has(slId)) {
        result.add(slId)
      }
    } else {
      for (const sl of skillLines.list) {
        if (sl.subcategoryId === category.id && !EXCLUDED_SKILL_LINES.has(sl.id)) {
          result.add(sl.id)
        }
      }
    }
  }

  return result
}
