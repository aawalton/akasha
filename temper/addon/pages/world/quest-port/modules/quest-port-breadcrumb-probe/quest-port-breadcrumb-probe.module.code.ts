import { ADDON_NAME } from "akasha/temper/addon/pages/world/modules/world-names/world-names.module.code.ts"
import type { PositionAnswer } from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-capture/quest-port-capture.module.code.ts"
import {
  notePlayer,
  noteProbe,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-trace/quest-port-trace.module.code.ts"
import { onOverlandMap } from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-travel/quest-port-travel.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const EVENT_NAMESPACE = ADDON_NAME + "QuestPortProbe"
const PROBE_WAIT_MS = 1500
const MAX_PROBE_ZOOM_OUTS = 4

interface ProbeQuestion {
  readonly questIndex: number
  readonly stepIndex: number
  readonly conditionIndex: number
}

interface Run {
  readonly id: number
  readonly question: ProbeQuestion
  readonly done: (this: void) => undefined
}

interface Waiting {
  readonly taskId: number
  readonly label: string
  readonly result: number
  readonly next: (this: void) => undefined
}

let runs = 0
let run: Run | undefined
let waiting: Waiting | undefined

function alive(this: void, probing: Run): boolean {
  return run !== undefined && run.id === probing.id
}

function probeOn(
  this: void,
  probing: Run,
  label: string,
  result: number,
  next: (this: void) => undefined
): undefined {
  if (!alive(probing)) return undefined
  const q = probing.question
  const taskId =
    result === SET_MAP_RESULT_FAILED
      ? undefined
      : RequestJournalQuestConditionAssistance(q.questIndex, q.stepIndex, q.conditionIndex)
  if (taskId === undefined) {
    noteProbe(label, result)
    return next()
  }
  waiting = { taskId, label, result, next }
  zo_callLater(() => {
    if (waiting === undefined || waiting.taskId !== taskId) return
    waiting = undefined
    CancelRequestJournalQuestConditionAssistance(taskId)
    noteProbe(label, result, undefined, true)
    next()
  }, PROBE_WAIT_MS)
  return undefined
}

function finish(this: void, probing: Run): undefined {
  if (!alive(probing)) return undefined
  run = undefined
  SetMapToPlayerLocation()
  return probing.done()
}

function playerMap(this: void, probing: Run): undefined {
  if (!alive(probing)) return undefined
  const result = SetMapToPlayerLocation()
  notePlayer()
  return probeOn(probing, "player-map", result, () => finish(probing))
}

function questZone(this: void, probing: Run): undefined {
  if (!alive(probing)) return undefined
  const result = SetMapToQuestZone(probing.question.questIndex)
  return probeOn(probing, "quest-zone", result, () => playerMap(probing))
}

function zoomOut(this: void, probing: Run, level: number): undefined {
  if (!alive(probing)) return undefined
  if (onOverlandMap() || level > MAX_PROBE_ZOOM_OUTS) return questZone(probing)
  const result = MapZoomOut()
  return probeOn(probing, `zoom-out ${level}`, result, () =>
    result === SET_MAP_RESULT_FAILED ? questZone(probing) : zoomOut(probing, level + 1)
  )
}

export function probeBreadcrumb(
  this: void,
  question: ProbeQuestion,
  done: (this: void) => undefined
): undefined {
  cancelProbe()
  runs += 1
  const probing: Run = { id: runs, question, done }
  run = probing
  const result = SetMapToQuestCondition(
    question.questIndex,
    question.stepIndex,
    question.conditionIndex
  )
  return probeOn(probing, "own-map", result, () => zoomOut(probing, 1))
}

export function cancelProbe(this: void): undefined {
  run = undefined
  if (waiting !== undefined) {
    CancelRequestJournalQuestConditionAssistance(waiting.taskId)
    waiting = undefined
  }
  return undefined
}

function onProbeAnswered(this: void, taskId: number, answer: PositionAnswer): undefined {
  if (waiting === undefined || waiting.taskId !== taskId) return undefined
  const answered = waiting
  waiting = undefined
  noteProbe(answered.label, answered.result, answer)
  return answered.next()
}

export function initBreadcrumbProbe(this: void): undefined {
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
      onProbeAnswered(taskId, {
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
