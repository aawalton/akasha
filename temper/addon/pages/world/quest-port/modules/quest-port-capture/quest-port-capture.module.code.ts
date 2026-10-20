import type { PortTarget } from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-choose/quest-port-choose.module.code.ts"

export const PORT_TRACE_CAP = 20

export const CLOSEST_KEPT = 5

export interface CapturedCondition {
  readonly conditionIndex: number
  readonly text: string
  readonly current: number
  readonly max: number
  readonly isFailCondition: boolean
  readonly isComplete: boolean
  readonly isVisible: boolean
}

export interface CapturedStep {
  readonly stepIndex: number
  readonly text: string
  readonly trackerOverrideText: string
  readonly conditions: CapturedCondition[]
}

export interface CapturedQuest {
  readonly journalIndex: number
  readonly name: string
  readonly zoneName: string
  readonly zoneIndex: number
  readonly objectiveName: string
  readonly poiIndex: number
  readonly questType: number
  readonly repeatType: number
  readonly level: number
  readonly isAssisted: boolean
  readonly isComplete: boolean
  readonly steps: CapturedStep[]
}

export interface JournalCapture {
  readonly at: number
  readonly character: string
  readonly quests: CapturedQuest[]
}

export interface MapReading {
  readonly name: string
  readonly mapId: number
  readonly mapType: number
  readonly contentType: number
  readonly zoneIndex: number
  readonly zoneName: string
}

interface MapStep {
  readonly step: string
  readonly result: number
  readonly map: MapReading
}

export interface PositionAnswer {
  readonly pinType: number
  readonly xLoc: number
  readonly yLoc: number
  readonly areaRadius: number
  readonly insideCurrentMapWorld: boolean
  readonly isBreadcrumb: boolean
  readonly teleportNPCId: number
  readonly waypointId: number
  readonly symbolicState: number
  readonly additionalSymbolicLocX: number
  readonly additionalSymbolicLocY: number
}

interface CandidateReading {
  readonly kind: PortTarget["kind"]
  readonly name: string
  readonly nodeIndex: number
  readonly houseId: number
  readonly x: number
  readonly y: number
  readonly distance: number
}

export interface RecallReading {
  readonly remain: number
  readonly blockedFor: number
  readonly cost: number
  readonly money: number
}

export interface UniversalReading {
  readonly x: number
  readonly y: number
}

export interface ProbeReading {
  readonly label: string
  readonly result: number
  readonly map: MapReading
  readonly answer?: PositionAnswer
  readonly universal?: UniversalReading
  readonly timedOut?: boolean
}

export interface PlayerReading {
  readonly map: MapReading
  readonly x: number
  readonly y: number
  readonly universal: UniversalReading
}

export interface SpotReading {
  readonly mapId: number
  readonly x: number
  readonly y: number
}

interface NamesakeReading {
  readonly nodeIndex: number
  readonly name: string
  readonly poiType: number
  readonly known: boolean
  readonly locked: boolean
  readonly outboundOnly: boolean
}

export const NAMESAKES_KEPT = 5

export interface InstanceReading {
  readonly zoneId: number
  readonly name: string
  readonly playerZoneId: number
  readonly target?: CandidateReading
  readonly namesakes: NamesakeReading[]
}

export interface PortTraceEntry {
  at: number
  character: string
  slotIndex?: number
  itemId?: number
  itemName?: string
  spots?: SpotReading[]
  journalIndex?: number
  questName?: string
  stepIndex?: number
  conditionIndex?: number
  conditionText?: string
  mapBefore?: MapReading
  mapSteps: MapStep[]
  instance?: InstanceReading
  taskId?: number
  answer?: PositionAnswer
  answerUniversal?: UniversalReading
  timedOut?: boolean
  nodesRead?: number
  candidatesKept?: number
  closest?: CandidateReading[]
  target?: CandidateReading
  recall?: RecallReading
  player?: PlayerReading
  probes?: ProbeReading[]
  said: string[]
}

interface TaskListFocus {
  readonly journalIndex: number
  readonly name: string
  readonly assistedWithZero: boolean
  readonly assistedWithNil: boolean
}

interface TaskListReading {
  readonly assistedName?: string
  readonly refreshCount: number
  readonly lastRefreshAt?: number
  readonly lastSyncedName?: string
  readonly quests: TaskListFocus[]
}

export interface AssistedReading {
  readonly journalIndex?: number
  readonly questName?: string
  readonly headerText?: string
  readonly headerHidden?: boolean
  readonly panelHidden?: boolean
  readonly taskList?: TaskListReading
}

export interface AssistNextEntry {
  at: number
  character: string
  before?: AssistedReading
  after?: AssistedReading
  later?: AssistedReading
}

export function keepLast<T>(this: void, list: readonly T[], item: T, cap: number): T[] {
  const next = [...list, item]
  if (next.length <= cap) return next
  return next.slice(next.length - cap)
}

export function candidateAt(
  this: void,
  target: PortTarget,
  x: number,
  y: number
): CandidateReading {
  const dx = target.x - x
  const dy = target.y - y
  return {
    kind: target.kind,
    name: target.name,
    nodeIndex: target.nodeIndex,
    houseId: target.houseId,
    x: target.x,
    y: target.y,
    distance: Math.sqrt(dx * dx + dy * dy),
  }
}

export function closestCandidates(
  this: void,
  targets: readonly PortTarget[],
  x: number,
  y: number,
  count: number
): CandidateReading[] {
  const measured = targets.map((target) => candidateAt(target, x, y))
  measured.sort((a, b) => a.distance - b.distance)
  return measured.slice(0, count)
}
