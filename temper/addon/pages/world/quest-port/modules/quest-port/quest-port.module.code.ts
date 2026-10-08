import { ADDON_NAME } from "akasha/temper/addon/pages/world/modules/world-names/world-names.module.code.ts"
import {
  type ConditionReading,
  type NodeKind,
  type NodeReading,
  nearestTarget,
  objectiveCondition,
  type PortTarget,
  portTargets,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-choose/quest-port-choose.module.code.ts"
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
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const EVENT_NAMESPACE = ADDON_NAME + "QuestPort"
const ANSWER_WAIT_MS = 3000
const MAX_ZOOM_OUTS = 4

interface Asked {
  readonly taskId: number
  readonly objective: string
}

let asked: Asked | undefined

ZO_CreateStringId("SI_BINDING_NAME_TEMPER_PORT_NEAR_QUEST_OBJECTIVE", "Port Near Quest Objective")

function say(this: void, text: string): undefined {
  d(`[Temper] ${text}`)
  return undefined
}

function focusedQuestIndex(this: void): number | undefined {
  for (let questIndex = 1; questIndex <= MAX_JOURNAL_QUESTS; questIndex++) {
    if (IsValidQuestIndex(questIndex) && GetTrackedIsAssisted(TRACK_TYPE_QUEST, questIndex)) {
      return questIndex
    }
  }
  return undefined
}

function conditionReadings(this: void, questIndex: number): ConditionReading[] {
  const readings: ConditionReading[] = []
  const numSteps = GetJournalQuestNumSteps(questIndex)
  for (let stepIndex = QUEST_MAIN_STEP_INDEX; stepIndex <= numSteps; stepIndex++) {
    const numConditions = GetJournalQuestNumConditions(questIndex, stepIndex)
    for (let conditionIndex = 1; conditionIndex <= numConditions; conditionIndex++) {
      const [, , isFailCondition, isComplete, , isVisible] = GetJournalQuestConditionValues(
        questIndex,
        stepIndex,
        conditionIndex
      )
      readings.push({ stepIndex, conditionIndex, isVisible, isFailCondition, isComplete })
    }
  }
  return readings
}

function endingStepIndex(this: void, questIndex: number): number | undefined {
  const numSteps = GetJournalQuestNumSteps(questIndex)
  for (let stepIndex = QUEST_MAIN_STEP_INDEX; stepIndex <= numSteps; stepIndex++) {
    if (IsJournalQuestStepEnding(questIndex, stepIndex)) return stepIndex
  }
  return undefined
}

function setMapToObjective(
  this: void,
  questIndex: number,
  condition: ConditionReading | undefined
): boolean {
  let result = SET_MAP_RESULT_FAILED
  if (condition !== undefined) {
    result = SetMapToQuestCondition(questIndex, condition.stepIndex, condition.conditionIndex)
  } else {
    const ending = endingStepIndex(questIndex)
    if (ending !== undefined) result = SetMapToQuestStepEnding(questIndex, ending)
  }
  if (result === SET_MAP_RESULT_FAILED) result = SetMapToQuestZone(questIndex)
  if (result === SET_MAP_RESULT_FAILED) return false
  for (let zoomOuts = 0; zoomOuts < MAX_ZOOM_OUTS && GetMapType() !== MAPTYPE_ZONE; zoomOuts++) {
    if (MapZoomOut() === SET_MAP_RESULT_FAILED) break
  }
  return true
}

function kindOf(this: void, poiType: number): NodeKind {
  if (poiType === POI_TYPE_WAYSHRINE) return "wayshrine"
  if (poiType === POI_TYPE_HOUSE) return "house"
  return "other"
}

function nodeReadings(this: void): NodeReading[] {
  const readings: NodeReading[] = []
  const numNodes = GetNumFastTravelNodes()
  for (let nodeIndex = 1; nodeIndex <= numNodes; nodeIndex++) {
    const [known, name, x, y, , , poiType, shownOnMap, locked] = GetFastTravelNodeInfo(nodeIndex)
    const [outboundOnly] = GetFastTravelNodeOutboundOnlyInfo(nodeIndex)
    const kind = kindOf(poiType)
    const houseId = kind === "house" ? GetFastTravelNodeHouseId(nodeIndex) : 0
    const houseOwned = houseId > 0 && IsCollectibleUnlocked(GetCollectibleIdForHouse(houseId))
    readings.push({
      nodeIndex,
      name: zo_strformat("<<1>>", name),
      kind,
      known,
      shownOnMap,
      locked,
      outboundOnly,
      houseId,
      houseOwned,
      x,
      y,
    })
  }
  return readings
}

function portTo(this: void, target: PortTarget, objective: string): undefined {
  if (target.kind === "house") {
    say(`Porting outside ${target.name}, nearest to ${objective}.`)
    RequestJumpToHouse(target.houseId, true)
    return undefined
  }
  if (GetInteractionType() !== INTERACTION_FAST_TRAVEL) {
    const [remain] = GetRecallCooldown()
    if (remain > 0) {
      say(
        `Recall is cooling down for ${Math.ceil(remain / 1000)}s, so ${target.name} is out of reach.`
      )
      return undefined
    }
    const cost = GetRecallCost(target.nodeIndex)
    if (cost > GetCurrentMoney()) {
      say(`Recall to ${target.name} costs ${cost} gold, more than you carry.`)
      return undefined
    }
  }
  say(`Porting to ${target.name}, nearest to ${objective}.`)
  FastTravelToNode(target.nodeIndex)
  return undefined
}

function onPositionAnswered(
  this: void,
  _eventCode: number,
  taskId: number,
  _pinType: number,
  x: number,
  y: number
): undefined {
  if (asked === undefined || asked.taskId !== taskId) return undefined
  const objective = asked.objective
  asked = undefined
  const target = nearestTarget(portTargets(nodeReadings()), x, y)
  SetMapToPlayerLocation()
  if (target === undefined) {
    say(`No wayshrine you have found and no house you own is on the map of ${objective}.`)
    return undefined
  }
  return portTo(target, objective)
}

function giveUpOn(this: void, taskId: number): undefined {
  if (asked === undefined || asked.taskId !== taskId) return undefined
  const objective = asked.objective
  asked = undefined
  CancelRequestJournalQuestConditionAssistance(taskId)
  SetMapToPlayerLocation()
  say(`The game gave no position for ${objective}.`)
  return undefined
}

export function portNearQuestObjective(this: void): undefined {
  if (IsUnitInCombat("player")) return say("Porting waits until you are out of combat.")
  const questIndex = focusedQuestIndex()
  if (questIndex === undefined) return say("No quest is focused in the tracker.")
  if (asked !== undefined) {
    CancelRequestJournalQuestConditionAssistance(asked.taskId)
    asked = undefined
  }
  const condition = GetJournalQuestIsComplete(questIndex)
    ? undefined
    : objectiveCondition(conditionReadings(questIndex))
  const objective =
    condition === undefined
      ? GetJournalQuestName(questIndex)
      : GetJournalQuestConditionInfo(questIndex, condition.stepIndex, condition.conditionIndex)[0]
  if (!setMapToObjective(questIndex, condition)) {
    return say(`The map cannot show where ${objective} is.`)
  }
  const taskId =
    condition === undefined
      ? RequestJournalQuestConditionAssistance(questIndex, QUEST_MAIN_STEP_INDEX, 1)
      : RequestJournalQuestConditionAssistance(
          questIndex,
          condition.stepIndex,
          condition.conditionIndex
        )
  if (taskId === undefined) {
    SetMapToPlayerLocation()
    return say(`The game gave no position for ${objective}.`)
  }
  asked = { taskId, objective }
  zo_callLater(() => giveUpOn(taskId), ANSWER_WAIT_MS)
  return undefined
}

export function initQuestPort(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent<[number, number, number, number]>(
    EVENT_NAMESPACE,
    EVENT_QUEST_POSITION_REQUEST_COMPLETE,
    (eventCode, taskId, pinType, x, y) => {
      onPositionAnswered(eventCode, taskId, pinType, x, y)
    }
  )
  return undefined
}
