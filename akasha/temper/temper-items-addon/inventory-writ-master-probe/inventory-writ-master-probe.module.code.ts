import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type {
  MasterWritProbe,
  MasterWritProbeCondition,
  MasterWritProbeQuest,
  MasterWritProbeStep,
} from "../inventory-writ-master-probe-types/inventory-writ-master-probe-types.module.code.ts"

function probeCondition(
  this: void,
  questIndex: number,
  stepIndex: number,
  conditionIndex: number
): MasterWritProbeCondition {
  const [
    masterItemId,
    materialItemId,
    craftingType,
    itemQuality,
    itemTemplateId,
    itemSetId,
    itemTraitType,
    itemStyleId,
    encodedAlchemyTraits,
  ] = GetQuestConditionMasterWritInfo(questIndex, stepIndex, conditionIndex)
  const [condText, current, max, , condComplete] = GetJournalQuestConditionInfo(
    questIndex,
    stepIndex,
    conditionIndex
  )
  return {
    conditionIndex,
    condText: condText ?? "",
    current: current ?? 0,
    max: max ?? 0,
    complete: condComplete === true,
    masterItemId,
    materialItemId,
    craftingType,
    quality: itemQuality,
    templateId: itemTemplateId,
    setId: itemSetId,
    traitType: itemTraitType,
    styleId: itemStyleId,
    encodedAlchemyTraits,
  }
}

function probeQuest(this: void, questIndex: number, numSteps: number): MasterWritProbeQuest {
  const [questName, , activeStepText] = GetJournalQuestInfo(questIndex)
  const steps: MasterWritProbeStep[] = []
  for (let s = 1; s <= numSteps; s++) {
    const numConditions = GetJournalQuestNumConditions(questIndex, s)
    const conditions: MasterWritProbeCondition[] = []
    for (let c = 1; c <= numConditions; c++) {
      conditions.push(probeCondition(questIndex, s, c))
    }
    steps.push({
      stepIndex: s,
      ending: IsJournalQuestStepEnding(questIndex, s) === true,
      numConditions,
      conditions,
    })
  }
  return {
    questIndex,
    name: zo_strformat("<<1>>", questName),
    repeatType: GetJournalQuestRepeatType(questIndex),
    questType: GetJournalQuestType(questIndex),
    numSteps,
    activeStepText: activeStepText ?? "",
    steps,
  }
}

export function probeMasterWrits(this: void): undefined {
  const numQuests = GetNumJournalQuests()
  const quests: MasterWritProbeQuest[] = []

  for (let i = 1; i <= numQuests; i++) {
    const numSteps = GetJournalQuestNumSteps(i)
    if (numSteps < 1) continue
    quests.push(probeQuest(i, numSteps))
  }

  const probe: MasterWritProbe = { timestamp: GetTimeStamp(), quests }

  const sv = getSavedVariables()
  if (sv.diagnostics === undefined) sv.diagnostics = {}
  sv.diagnostics.lastMasterWritProbe = probe

  d(
    `[${ADDON_NAME}] master-writ probe captured ${quests.length} quest(s) → /reloadui to flush it to saved variables`
  )
}
