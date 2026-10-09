import { ADDON_NAME } from "akasha/temper/addon/pages/world/modules/world-names/world-names.module.code.ts"
import type {
  CapturedCondition,
  CapturedQuest,
  CapturedStep,
  JournalCapture,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-capture/quest-port-capture.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/world/quests/modules/quests-saved-variables/quests-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-3/eso-api-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const EVENT_NAMESPACE = ADDON_NAME + "QuestPortJournal"

const JOURNAL_EVENTS = [
  EVENT_QUEST_ADDED,
  EVENT_QUEST_ADVANCED,
  EVENT_QUEST_REMOVED,
  EVENT_QUEST_CONDITION_COUNTER_CHANGED,
  EVENT_QUEST_LIST_UPDATED,
  EVENT_PLAYER_ACTIVATED,
]

function plain(this: void, text: string): string {
  return zo_strformat("<<1>>", text)
}

function capturedConditions(
  this: void,
  questIndex: number,
  stepIndex: number,
  numConditions: number
): CapturedCondition[] {
  const conditions: CapturedCondition[] = []
  for (let conditionIndex = 1; conditionIndex <= numConditions; conditionIndex++) {
    const [text, current, max, isFailCondition, isComplete, , isVisible] =
      GetJournalQuestConditionInfo(questIndex, stepIndex, conditionIndex)
    conditions.push({
      conditionIndex,
      text: plain(text),
      current,
      max,
      isFailCondition,
      isComplete,
      isVisible,
    })
  }
  return conditions
}

function capturedSteps(this: void, questIndex: number): CapturedStep[] {
  const steps: CapturedStep[] = []
  const numSteps = GetJournalQuestNumSteps(questIndex)
  for (let stepIndex = QUEST_MAIN_STEP_INDEX; stepIndex <= numSteps; stepIndex++) {
    const [text, , , trackerOverrideText, numConditions] = GetJournalQuestStepInfo(
      questIndex,
      stepIndex
    )
    steps.push({
      stepIndex,
      text: plain(text),
      trackerOverrideText: plain(trackerOverrideText),
      conditions: capturedConditions(questIndex, stepIndex, numConditions),
    })
  }
  return steps
}

function capturedQuest(this: void, questIndex: number): CapturedQuest {
  const [name, , , , , completed, , level, , questType] = GetJournalQuestInfo(questIndex)
  const [zoneName, objectiveName, zoneIndex, poiIndex] = GetJournalQuestLocationInfo(questIndex)
  return {
    journalIndex: questIndex,
    name: plain(name),
    zoneName: plain(zoneName),
    zoneIndex,
    objectiveName: plain(objectiveName),
    poiIndex,
    questType,
    repeatType: GetJournalQuestRepeatType(questIndex),
    level,
    isAssisted: GetTrackedIsAssisted(TRACK_TYPE_QUEST, questIndex),
    isComplete: completed,
    steps: capturedSteps(questIndex),
  }
}

function readJournal(this: void): JournalCapture {
  const quests: CapturedQuest[] = []
  for (let questIndex = 1; questIndex <= MAX_JOURNAL_QUESTS; questIndex++) {
    if (IsValidQuestIndex(questIndex)) quests.push(capturedQuest(questIndex))
  }
  return { at: GetTimeStamp(), character: plain(GetUnitName("player")), quests }
}

function captureJournal(this: void): undefined {
  try {
    const journal = readJournal()
    const sv = getSavedVariables()
    const kept = sv.questJournal ?? {}
    kept[journal.character] = journal
    sv.questJournal = kept
  } catch {
    return undefined
  }
  return undefined
}

export function initQuestPortJournal(this: void): undefined {
  for (const event of JOURNAL_EVENTS) {
    EVENT_MANAGER.RegisterForEvent(EVENT_NAMESPACE + String(event), event, () => {
      captureJournal()
    })
  }
  captureJournal()
  return undefined
}
