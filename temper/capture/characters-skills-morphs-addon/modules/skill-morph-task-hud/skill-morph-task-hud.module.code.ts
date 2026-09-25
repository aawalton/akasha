import {
  ALL_CLASS_ESO_SKILL_LINE_IDS,
  CLASS_ESO_SKILL_LINE_IDS,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-line-groups/character-capture-skill-line-groups.module.code.ts"
import { MORPHABLE_SKILLS_DETAIL_PER_LINE } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-line-map/character-capture-skill-line-map.module.code.ts"
import {
  MORPHABLE_SKILLS_PER_LINE,
  SKILL_LINE_DISPLAY_ORDER,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-line-ranks/character-capture-skill-line-ranks.module.code.ts"
import {
  getSavedVariables,
  type TaskData,
} from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import type { ExpectedMorphableSkill } from "akasha/temper/player/skill-morph/modules/character-morph-progress-eso/character-morph-progress-eso.module.code.ts"
import {
  type MorphSuggestionEntry,
  selectMorphSuggestions,
} from "akasha/temper/player/skill-morph/modules/select-morph-suggestions/select-morph-suggestions.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"

const VAMPIRE_LINE_ID = 51
const WEREWOLF_LINE_ID = 50

const MUTUALLY_EXCLUSIVE_LINE_GROUPS: ReadonlyArray<ReadonlySet<number>> = [
  new Set<number>([VAMPIRE_LINE_ID, WEREWOLF_LINE_ID]),
]

const ALL_CLASS_LINE_ESO_IDS: ReadonlySet<number> = (() => {
  const set = new Set<number>()
  for (const k of Object.keys(ALL_CLASS_ESO_SKILL_LINE_IDS)) {
    set.add(Number(k))
  }
  return set
})()

const MORPHABLE_LINE_DISPLAY_ORDERS: ReadonlyMap<number, number> = (() => {
  const map = new Map<number, number>()
  for (const k of Object.keys(MORPHABLE_SKILLS_PER_LINE)) {
    const lineId = Number(k)
    const displayOrder = SKILL_LINE_DISPLAY_ORDER[lineId]
    if (displayOrder !== undefined) map.set(lineId, displayOrder)
  }
  return map
})()

const EXPECTED_SKILLS_BY_ESO_LINE_ID: ReadonlyMap<
  number,
  ReadonlyArray<ExpectedMorphableSkill>
> = (() => {
  const map = new Map<number, ReadonlyArray<ExpectedMorphableSkill>>()
  for (const k of Object.keys(MORPHABLE_SKILLS_DETAIL_PER_LINE)) {
    const lineId = Number(k)
    const skills = MORPHABLE_SKILLS_DETAIL_PER_LINE[lineId]
    if (skills !== undefined) map.set(lineId, skills)
  }
  return map
})()

function getPlayerClassLineEsoIds(charClassId: number): ReadonlySet<number> {
  const lines = CLASS_ESO_SKILL_LINE_IDS[charClassId]
  const set = new Set<number>()
  if (lines !== undefined) {
    for (const id of lines) set.add(id)
  }
  return set
}

function getEquippedSkillNames(): ReadonlySet<string> {
  const names = new Set<string>()
  for (const hotbar of [HOTBAR_CATEGORY_PRIMARY, HOTBAR_CATEGORY_BACKUP]) {
    for (let slot = 3; slot <= 9; slot++) {
      const name = GetSlotName(slot, hotbar)
      if (name !== "") names.add(name)
    }
  }
  return names
}

function getSkillLineRanks(): ReadonlyMap<number, number> {
  const map = new Map<number, number>()
  const numSkillTypes = GetNumSkillTypes()
  for (let skillType = 1; skillType <= numSkillTypes; skillType++) {
    const numLines = GetNumSkillLines(skillType)
    for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
      const skillLineData = SKILLS_DATA_MANAGER.GetSkillLineDataByIndices(skillType, lineIndex)
      if (!skillLineData?.IsDiscovered()) continue
      const [, , , skillLineId] = GetSkillLineInfo(skillType, lineIndex)
      if (skillLineId === undefined || skillLineId === 0) continue
      const [currentRank] = GetSkillLineDynamicInfo(skillType, lineIndex)
      if (currentRank === undefined) continue
      map.set(skillLineId, currentRank)
    }
  }
  return map
}

export function isSkillMorphTask(this: void, task: TaskData): boolean {
  return task.completionCardId === "skill-morphs"
}

function computeSkillMorphResult(
  task: TaskData
): ReturnType<typeof selectMorphSuggestions> | undefined {
  const sv = getSavedVariables()
  const charId = GetCurrentCharacterId()
  const charData = sv.characters[charId]
  const slp = charData?.skillLineProgress
  if (slp === undefined) return undefined

  return selectMorphSuggestions({
    taskItemPath: task.completionItemPath,
    skillLineProgress: slp,
    classLineEsoIds: ALL_CLASS_LINE_ESO_IDS,
    playerClassLineEsoIds: getPlayerClassLineEsoIds(charData?.classId ?? 0),
    mutuallyExclusiveLineGroups: MUTUALLY_EXCLUSIVE_LINE_GROUPS,
    equippedSkillNames: getEquippedSkillNames(),
    caps: { active: 7, ultimate: 2 },
    morphableLineDisplayOrders: MORPHABLE_LINE_DISPLAY_ORDERS,
    expectedSkillsByEsoLineId: EXPECTED_SKILLS_BY_ESO_LINE_ID,
    skillLineRanks: getSkillLineRanks(),
  })
}

export function getSkillMorphEnrichment(
  this: void,
  task: TaskData
): readonly MorphSuggestionEntry[] | undefined {
  return computeSkillMorphResult(task)?.suggestions
}

export function isSkillMorphTaskComplete(this: void, task: TaskData): boolean {
  const result = computeSkillMorphResult(task)
  if (result === undefined) return false
  return result.isComplete
}
