import { ADDON_NAME } from "akasha/temper/addon/pages/world/modules/world-names/world-names.module.code.ts"
import type { PositionAnswer } from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-capture/quest-port-capture.module.code.ts"
import {
  type ConditionReading,
  type MapAttempt,
  mapAttempts,
  type NodeKind,
  type NodeReading,
  nearestTarget,
  type PortTarget,
  portTargets,
  type StepReading,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-choose/quest-port-choose.module.code.ts"
import {
  beginPress,
  noteAnswer,
  noteCandidates,
  noteMapStep,
  noteQuest,
  noteRecall,
  noteSaid,
  noteTask,
  noteTimedOut,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-trace/quest-port-trace.module.code.ts"
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
  noteSaid(text)
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

function stepReadings(this: void, questIndex: number): StepReading[] {
  const steps: StepReading[] = []
  const numSteps = GetJournalQuestNumSteps(questIndex)
  for (let stepIndex = QUEST_MAIN_STEP_INDEX; stepIndex <= numSteps; stepIndex++) {
    const conditions: ConditionReading[] = []
    const numConditions = GetJournalQuestNumConditions(questIndex, stepIndex)
    for (let conditionIndex = 1; conditionIndex <= numConditions; conditionIndex++) {
      const [, , , isComplete] = GetJournalQuestConditionValues(
        questIndex,
        stepIndex,
        conditionIndex
      )
      conditions.push({ conditionIndex, isComplete })
    }
    steps.push({ stepIndex, isEnding: IsJournalQuestStepEnding(questIndex, stepIndex), conditions })
  }
  return steps
}

function setMapTo(this: void, questIndex: number, attempt: MapAttempt): number {
  if (attempt.kind === "ending") {
    const result = SetMapToQuestStepEnding(questIndex, attempt.stepIndex)
    noteMapStep(`set-to-step-ending ${attempt.stepIndex}`, result)
    return result
  }
  const result = SetMapToQuestCondition(questIndex, attempt.stepIndex, attempt.conditionIndex)
  noteMapStep(`set-to-condition ${attempt.stepIndex}.${attempt.conditionIndex}`, result)
  return result
}

function zoomOutToZone(this: void): undefined {
  for (let zoomOuts = 0; zoomOuts < MAX_ZOOM_OUTS && GetMapType() !== MAPTYPE_ZONE; zoomOuts++) {
    const zoomed = MapZoomOut()
    noteMapStep("zoom-out", zoomed)
    if (zoomed === SET_MAP_RESULT_FAILED) break
  }
  return undefined
}

interface Placed {
  readonly shown: boolean
  readonly attempt: MapAttempt | undefined
}

function placeObjective(this: void, questIndex: number, attempts: readonly MapAttempt[]): Placed {
  for (const attempt of attempts) {
    if (setMapTo(questIndex, attempt) !== SET_MAP_RESULT_FAILED) {
      zoomOutToZone()
      return { shown: true, attempt }
    }
  }
  const result = SetMapToQuestZone(questIndex)
  noteMapStep("set-to-quest-zone", result)
  if (result === SET_MAP_RESULT_FAILED) return { shown: false, attempt: undefined }
  zoomOutToZone()
  return { shown: true, attempt: undefined }
}

function objectiveText(this: void, questIndex: number, attempt: MapAttempt | undefined): string {
  if (attempt === undefined || attempt.kind === "ending") return GetJournalQuestName(questIndex)
  const [text] = GetJournalQuestConditionInfo(questIndex, attempt.stepIndex, attempt.conditionIndex)
  return text === "" ? GetJournalQuestName(questIndex) : text
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
    const [remain, blockedFor] = GetRecallCooldown()
    noteRecall({
      remain,
      blockedFor,
      cost: GetRecallCost(target.nodeIndex),
      money: GetCurrentMoney(),
    })
    if (blockedFor > 0) {
      say(
        `Recall is blocked for ${Math.ceil(blockedFor / 1000)}s, so ${target.name} is out of reach.`
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

function onPositionAnswered(this: void, taskId: number, answer: PositionAnswer): undefined {
  if (asked === undefined || asked.taskId !== taskId) return undefined
  noteAnswer(answer)
  const objective = asked.objective
  asked = undefined
  const x = answer.xLoc
  const y = answer.yLoc
  const nodes = nodeReadings()
  const targets = portTargets(nodes)
  const target = nearestTarget(targets, x, y)
  noteCandidates(nodes.length, targets, x, y, target)
  SetMapToPlayerLocation()
  if (target === undefined) {
    say(`No wayshrine you have found and no house you own is on the map of ${objective}.`)
    return undefined
  }
  return portTo(target, objective)
}

function giveUpOn(this: void, taskId: number): undefined {
  if (asked === undefined || asked.taskId !== taskId) return undefined
  noteTimedOut()
  const objective = asked.objective
  asked = undefined
  CancelRequestJournalQuestConditionAssistance(taskId)
  SetMapToPlayerLocation()
  say(`The game gave no position for ${objective}.`)
  return undefined
}

export function portNearQuestObjective(this: void): undefined {
  beginPress()
  if (IsUnitInCombat("player")) return say("Porting waits until you are out of combat.")
  const questIndex = focusedQuestIndex()
  if (questIndex === undefined) return say("No quest is focused in the tracker.")
  if (asked !== undefined) {
    CancelRequestJournalQuestConditionAssistance(asked.taskId)
    asked = undefined
  }
  const attempts = mapAttempts(stepReadings(questIndex))
  const placed = placeObjective(questIndex, attempts)
  const chosen = placed.attempt ?? attempts[0]
  const condition = chosen?.kind === "condition" ? chosen : undefined
  const objective = objectiveText(questIndex, chosen)
  noteQuest(
    questIndex,
    GetJournalQuestName(questIndex),
    chosen?.stepIndex,
    condition?.conditionIndex,
    objective
  )
  if (!placed.shown) {
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
  noteTask(taskId)
  if (taskId === undefined) {
    SetMapToPlayerLocation()
    return say(`The game gave no position for ${objective}.`)
  }
  asked = { taskId, objective }
  zo_callLater(() => giveUpOn(taskId), ANSWER_WAIT_MS)
  return undefined
}

export function initQuestPort(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent<
    [
      number,
      number,
      number,
      number,
      number,
      boolean,
      boolean,
      number,
      number,
      number,
      number,
      number,
    ]
  >(
    EVENT_NAMESPACE,
    EVENT_QUEST_POSITION_REQUEST_COMPLETE,
    (
      _eventCode,
      taskId,
      pinType,
      xLoc,
      yLoc,
      areaRadius,
      insideCurrentMapWorld,
      isBreadcrumb,
      teleportNPCId,
      waypointId,
      symbolicState,
      additionalSymbolicLocX,
      additionalSymbolicLocY
    ) => {
      onPositionAnswered(taskId, {
        pinType,
        xLoc,
        yLoc,
        areaRadius,
        insideCurrentMapWorld,
        isBreadcrumb,
        teleportNPCId,
        waypointId,
        symbolicState,
        additionalSymbolicLocX,
        additionalSymbolicLocY,
      })
    }
  )
  return undefined
}
