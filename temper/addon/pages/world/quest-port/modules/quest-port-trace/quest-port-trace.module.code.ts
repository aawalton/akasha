import {
  CLOSEST_KEPT,
  candidateAt,
  closestCandidates,
  keepLast,
  type MapReading,
  type PlayerReading,
  PORT_TRACE_CAP,
  type PortTraceEntry,
  type PositionAnswer,
  type ProbeReading,
  type RecallReading,
  type SpotReading,
  type UniversalReading,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-capture/quest-port-capture.module.code.ts"
import type { PortTarget } from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-choose/quest-port-choose.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/world/quests/modules/quests-saved-variables/quests-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

let current: PortTraceEntry | undefined

function readMap(this: void): MapReading {
  const zoneIndex = GetCurrentMapZoneIndex()
  return {
    name: zo_strformat("<<1>>", GetMapName()),
    mapId: GetCurrentMapId(),
    mapType: GetMapType(),
    contentType: GetMapContentType(),
    zoneIndex,
    zoneName: zo_strformat("<<1>>", GetZoneNameByIndex(zoneIndex)),
  }
}

function universalOf(this: void, x: number, y: number): UniversalReading {
  const [offsetX, offsetY, width, height] = GetUniversallyNormalizedMapInfo(GetCurrentMapId())
  return { x: offsetX + x * width, y: offsetY + y * height }
}

function noting(this: void, note: (entry: PortTraceEntry) => void): undefined {
  try {
    if (current !== undefined) note(current)
  } catch {
    return undefined
  }
  return undefined
}

type PressList = "questPortTrace" | "treasurePortTrace"

function beginOn(this: void, list: PressList): undefined {
  try {
    const entry: PortTraceEntry = {
      at: GetTimeStamp(),
      character: zo_strformat("<<1>>", GetUnitName("player")),
      mapSteps: [],
      said: [],
    }
    current = entry
    const sv = getSavedVariables()
    sv[list] = keepLast(sv[list] ?? [], entry, PORT_TRACE_CAP)
    entry.mapBefore = readMap()
  } catch {
    return undefined
  }
  return undefined
}

export function beginPress(this: void): undefined {
  return beginOn("questPortTrace")
}

export function beginTreasurePress(this: void): undefined {
  return beginOn("treasurePortTrace")
}

export function noteTreasure(
  this: void,
  slotIndex: number,
  itemId: number,
  itemName: string,
  spots: readonly SpotReading[]
): undefined {
  return noting((entry) => {
    entry.slotIndex = slotIndex
    entry.itemId = itemId
    entry.itemName = zo_strformat("<<1>>", itemName)
    entry.spots = [...spots]
  })
}

export function noteQuest(
  this: void,
  journalIndex: number,
  questName: string,
  stepIndex: number | undefined,
  conditionIndex: number | undefined,
  conditionText: string
): undefined {
  return noting((entry) => {
    entry.journalIndex = journalIndex
    entry.questName = zo_strformat("<<1>>", questName)
    entry.stepIndex = stepIndex
    entry.conditionIndex = conditionIndex
    entry.conditionText = zo_strformat("<<1>>", conditionText)
  })
}

export function noteMapStep(this: void, step: string, result: number): undefined {
  return noting((entry) => {
    entry.mapSteps.push({ step, result, map: readMap() })
  })
}

export function noteTask(this: void, taskId: number | undefined): undefined {
  return noting((entry) => {
    entry.taskId = taskId
  })
}

export function noteAnswer(this: void, answer: PositionAnswer): undefined {
  return noting((entry) => {
    entry.answer = answer
    entry.answerUniversal = universalOf(answer.xLoc, answer.yLoc)
    entry.mapSteps.push({ step: "answered", result: 0, map: readMap() })
  })
}

export function noteProbe(
  this: void,
  label: string,
  result: number,
  answer?: PositionAnswer,
  timedOut?: boolean
): undefined {
  return noting((entry) => {
    const probe: ProbeReading = {
      label,
      result,
      map: readMap(),
      answer,
      universal: answer === undefined ? undefined : universalOf(answer.xLoc, answer.yLoc),
      timedOut,
    }
    entry.probes = [...(entry.probes ?? []), probe]
  })
}

export function notePlayer(this: void): undefined {
  return noting((entry) => {
    const [x, y] = GetMapPlayerPosition("player")
    const player: PlayerReading = { map: readMap(), x, y, universal: universalOf(x, y) }
    entry.player = player
  })
}

export function noteTimedOut(this: void): undefined {
  return noting((entry) => {
    entry.timedOut = true
  })
}

export function noteCandidates(
  this: void,
  nodesRead: number,
  targets: readonly PortTarget[],
  x: number,
  y: number,
  chosen: PortTarget | undefined
): undefined {
  return noting((entry) => {
    entry.nodesRead = nodesRead
    entry.candidatesKept = targets.length
    entry.closest = closestCandidates(targets, x, y, CLOSEST_KEPT)
    entry.target = chosen === undefined ? undefined : candidateAt(chosen, x, y)
  })
}

export function noteRecall(this: void, recall: RecallReading): undefined {
  return noting((entry) => {
    entry.recall = recall
  })
}

export function noteSaid(this: void, text: string): undefined {
  return noting((entry) => {
    entry.said.push(text)
  })
}
