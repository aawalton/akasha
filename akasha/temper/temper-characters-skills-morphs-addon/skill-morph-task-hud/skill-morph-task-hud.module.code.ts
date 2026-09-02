import {
  ALL_CLASS_ESO_SKILL_LINE_IDS,
  CLASS_ESO_SKILL_LINE_IDS,
} from "@akasha/temper-characters-capture-addon/character-capture-skill-line-groups"
import { MORPHABLE_SKILLS_DETAIL_PER_LINE } from "@akasha/temper-characters-capture-addon/character-capture-skill-line-map"
import {
  MORPHABLE_SKILLS_PER_LINE,
  SKILL_LINE_DISPLAY_ORDER,
} from "@akasha/temper-characters-capture-addon/character-capture-skill-line-ranks"
import type { SkillLineProgress } from "@akasha/temper-completion/completion-progress"
import {
  getSavedVariables,
  type TaskData,
} from "@akasha/temper-player-completion-state/completion-saved-variables"
import type { ExpectedMorphableSkill } from "@akasha/temper-skill-morphs/character-morph-progress-eso"
import {
  type MorphSuggestionEntry,
  pickRelevantSkillLineIds,
  selectMorphSuggestions,
} from "@akasha/temper-skill-morphs/select-morph-suggestions"

export type SkillMorphEnrichmentEntry = MorphSuggestionEntry

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

export function getRelevantSkillLineIds(
  this: void,
  task: TaskData,
  slp: Record<number, SkillLineProgress>,
  charClassId: number
): readonly number[] {
  const keys: number[] = []
  for (const k of Object.keys(slp)) keys.push(Number(k))
  return pickRelevantSkillLineIds({
    taskItemPath: task.completionItemPath,
    skillLineKeys: keys,
    classLineEsoIds: ALL_CLASS_LINE_ESO_IDS,
    playerClassLineEsoIds: getPlayerClassLineEsoIds(charClassId),
    morphableLineDisplayOrders: MORPHABLE_LINE_DISPLAY_ORDERS,
  })
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
