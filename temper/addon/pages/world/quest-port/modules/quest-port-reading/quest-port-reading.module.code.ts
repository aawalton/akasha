import {
  KEY_OWNERS,
  type KeyOwnersReading,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-key-reading/quest-port-key-reading.module.code.ts"
import { savedVariablesRootSchema } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { z } from "zod"

const CONDITION = z.object({
  conditionIndex: z.number(),
  text: z.string(),
  current: z.number(),
  max: z.number(),
  isFailCondition: z.boolean(),
  isComplete: z.boolean(),
  isVisible: z.boolean(),
})

const STEP = z.object({
  stepIndex: z.number(),
  text: z.string(),
  trackerOverrideText: z.string(),
  conditions: luaArrayOrEmpty(CONDITION),
})

const QUEST = z.object({
  journalIndex: z.number(),
  name: z.string(),
  zoneName: z.string(),
  zoneIndex: z.number(),
  objectiveName: z.string(),
  poiIndex: z.number(),
  questType: z.number(),
  repeatType: z.number(),
  level: z.number(),
  isAssisted: z.boolean(),
  isComplete: z.boolean(),
  steps: luaArrayOrEmpty(STEP),
})

const JOURNAL = z.object({
  at: z.number(),
  character: z.string(),
  quests: luaArrayOrEmpty(QUEST),
})

const MAP = z.object({
  name: z.string(),
  mapId: z.number(),
  mapType: z.number(),
  contentType: z.number(),
  zoneIndex: z.number(),
  zoneName: z.string(),
})

const MAP_STEP = z.object({ step: z.string(), result: z.number(), map: MAP })

const ANSWER = z.object({
  pinType: z.number().optional(),
  xLoc: z.number().optional(),
  yLoc: z.number().optional(),
  areaRadius: z.number().optional(),
  insideCurrentMapWorld: z.boolean().optional(),
  isBreadcrumb: z.boolean().optional(),
  teleportNPCId: z.number().optional(),
  waypointId: z.number().optional(),
  symbolicState: z.number().optional(),
  additionalSymbolicLocX: z.number().optional(),
  additionalSymbolicLocY: z.number().optional(),
})

const CANDIDATE = z.object({
  kind: z.string(),
  name: z.string(),
  nodeIndex: z.number(),
  houseId: z.number(),
  x: z.number(),
  y: z.number(),
  distance: z.number(),
})

const UNIVERSAL = z.object({ x: z.number(), y: z.number() })

const PROBE = z.object({
  label: z.string(),
  result: z.number(),
  map: MAP,
  answer: ANSWER.optional(),
  universal: UNIVERSAL.optional(),
  timedOut: z.boolean().optional(),
})

const PLAYER = z.object({ map: MAP, x: z.number(), y: z.number(), universal: UNIVERSAL })

const RECALL = z.object({
  remain: z.number(),
  blockedFor: z.number(),
  cost: z.number(),
  money: z.number(),
})

export const PRESS = z.object({
  at: z.number(),
  character: z.string(),
  journalIndex: z.number().optional(),
  questName: z.string().optional(),
  stepIndex: z.number().optional(),
  conditionIndex: z.number().optional(),
  conditionText: z.string().optional(),
  mapBefore: MAP.optional(),
  mapSteps: luaArrayOrEmpty(MAP_STEP),
  taskId: z.number().optional(),
  answer: ANSWER.optional(),
  answerUniversal: UNIVERSAL.optional(),
  timedOut: z.boolean().optional(),
  nodesRead: z.number().optional(),
  candidatesKept: z.number().optional(),
  closest: luaArrayOrEmpty(CANDIDATE).optional(),
  target: CANDIDATE.optional(),
  recall: RECALL.optional(),
  player: PLAYER.optional(),
  probes: luaArrayOrEmpty(PROBE).optional(),
  said: luaArrayOrEmpty(z.string()),
})

const TASK_LIST_FOCUS = z.object({
  journalIndex: z.number(),
  name: z.string(),
  assistedWithZero: z.boolean(),
  assistedWithNil: z.boolean(),
})

const LABEL_DRAWN = z.object({
  text: z.string(),
  r: z.number(),
  g: z.number(),
  b: z.number(),
  a: z.number(),
})

const ROW_DRAWN = z.object({
  name: z.string(),
  hidden: z.boolean(),
  controlHidden: z.boolean(),
  offsetY: z.number().optional(),
  labels: luaArrayOrEmpty(LABEL_DRAWN),
})

const WINDOW_DRAWN = z.object({
  name: z.string(),
  hidden: z.boolean(),
  controlHidden: z.boolean(),
  alpha: z.number(),
  left: z.number(),
  top: z.number(),
  width: z.number(),
  height: z.number(),
})

const NAMED_WINDOW = z.object({
  name: z.string(),
  exists: z.boolean(),
  hidden: z.boolean().optional(),
  controlHidden: z.boolean().optional(),
})

const DRAWN = z.object({
  exit: z.string().optional(),
  window: WINDOW_DRAWN.optional(),
  contentHidden: z.boolean().optional(),
  contentChildren: z.number().optional(),
  emptyHidden: z.boolean().optional(),
  fragmentShowing: z.boolean().optional(),
  named: luaArrayOrEmpty(NAMED_WINDOW),
  rows: luaArrayOrEmpty(ROW_DRAWN),
})

const TASK_LIST = z.object({
  assistedName: z.string().optional(),
  refreshCount: z.number(),
  lastRefreshAt: z.number().optional(),
  lastSyncedName: z.string().optional(),
  quests: luaArrayOrEmpty(TASK_LIST_FOCUS),
  drawn: DRAWN.optional(),
})

const ASSISTED = z.object({
  journalIndex: z.number().optional(),
  questName: z.string().optional(),
  headerText: z.string().optional(),
  headerHidden: z.boolean().optional(),
  panelHidden: z.boolean().optional(),
  taskList: TASK_LIST.optional(),
})

const ASSIST_MOVE = z.object({
  at: z.number(),
  character: z.string(),
  before: ASSISTED.optional(),
  after: ASSISTED.optional(),
  later: ASSISTED.optional(),
})

const ACCOUNT_WIDE = z
  .object({
    questJournal: z.record(z.string(), JOURNAL).optional(),
    questPortTrace: luaArrayOrEmpty(PRESS).optional(),
    assistNextTrace: luaArrayOrEmpty(ASSIST_MOVE).optional(),
    keyOwnersTrace: luaArrayOrEmpty(KEY_OWNERS).optional(),
  })
  .passthrough()

export const QUEST_PORT_SAVED_VARIABLES = savedVariablesRootSchema(ACCOUNT_WIDE)

type JournalReading = z.infer<typeof JOURNAL>
type PressReading = z.infer<typeof PRESS>
type AssistMoveReading = z.infer<typeof ASSIST_MOVE>
type MapRead = z.infer<typeof MAP>
type AssistedRead = z.infer<typeof ASSISTED>

export interface QuestPortCaptures {
  readonly journals: readonly JournalReading[]
  readonly presses: readonly PressReading[]
  readonly assistMoves: readonly AssistMoveReading[]
  readonly keyOwners: readonly KeyOwnersReading[]
}

export function capturesIn(root: z.infer<typeof QUEST_PORT_SAVED_VARIABLES>): QuestPortCaptures {
  const journals: JournalReading[] = []
  const presses: PressReading[] = []
  const assistMoves: AssistMoveReading[] = []
  const keyOwners: KeyOwnersReading[] = []
  for (const account of Object.values(root.Default ?? {})) {
    const wide = account.$AccountWide
    if (wide === undefined) continue
    journals.push(...Object.values(wide.questJournal ?? {}))
    presses.push(...(wide.questPortTrace ?? []))
    assistMoves.push(...(wide.assistNextTrace ?? []))
    keyOwners.push(...(wide.keyOwnersTrace ?? []))
  }
  return { journals, presses, assistMoves, keyOwners }
}

function flag(on: boolean | undefined, word: string): string {
  return on === true ? ` ${word}` : ""
}

function mapLine(map: MapRead): string {
  return `"${map.name}" id=${String(map.mapId)} type=${String(map.mapType)} content=${String(map.contentType)} zone=${String(map.zoneIndex)} "${map.zoneName}"`
}

export function journalLines(journal: JournalReading): readonly string[] {
  const lines = [`journal of ${journal.character} at t=${String(journal.at)}`]
  const ordered = [...journal.quests].sort(
    (a, b) => Number(b.isAssisted) - Number(a.isAssisted) || a.journalIndex - b.journalIndex
  )
  for (const quest of ordered) {
    lines.push(
      `  ${String(quest.journalIndex)}: ${quest.name}${flag(quest.isAssisted, "FOCUSED")}${flag(quest.isComplete, "complete")}` +
        ` | zone "${quest.zoneName}" (${String(quest.zoneIndex)}) objective "${quest.objectiveName}" poi=${String(quest.poiIndex)}` +
        ` type=${String(quest.questType)} repeat=${String(quest.repeatType)} level=${String(quest.level)}`
    )
    if (!quest.isAssisted) continue
    for (const step of quest.steps) {
      lines.push(`      step ${String(step.stepIndex)}: ${step.text}`)
      for (const condition of step.conditions) {
        lines.push(
          `        ${String(condition.conditionIndex)}: ${condition.text} ${String(condition.current)}/${String(condition.max)}` +
            `${flag(condition.isComplete, "complete")}${flag(condition.isFailCondition, "fail")}${flag(!condition.isVisible, "hidden")}`
        )
      }
    }
  }
  return lines
}

export function pressLines(press: PressReading): readonly string[] {
  const lines = [
    `t=${String(press.at)} press by ${press.character}: quest ${String(press.journalIndex ?? "-")} "${press.questName ?? ""}" step ${String(press.stepIndex ?? "-")} condition ${String(press.conditionIndex ?? "-")} "${press.conditionText ?? ""}"`,
  ]
  if (press.mapBefore !== undefined) lines.push(`    map before: ${mapLine(press.mapBefore)}`)
  for (const step of press.mapSteps) {
    lines.push(`    ${step.step} -> ${String(step.result)}: ${mapLine(step.map)}`)
  }
  if (press.taskId !== undefined) lines.push(`    task ${String(press.taskId)}`)
  if (press.answer !== undefined) {
    lines.push(`    answer: ${answerText(press.answer)}${universalText(press.answerUniversal)}`)
  }
  if (press.timedOut === true) lines.push("    the game gave no answer in time")
  if (press.nodesRead !== undefined) {
    lines.push(
      `    nodes read ${String(press.nodesRead)}, candidates kept ${String(press.candidatesKept ?? 0)}`
    )
  }
  for (const one of press.closest ?? []) {
    lines.push(
      `      ${one.kind} "${one.name}" node=${String(one.nodeIndex)} house=${String(one.houseId)} at (${String(one.x)}, ${String(one.y)}) distance ${String(one.distance)}`
    )
  }
  if (press.target !== undefined) {
    lines.push(`    target: ${press.target.kind} "${press.target.name}"`)
  }
  if (press.recall !== undefined) {
    const r = press.recall
    lines.push(
      `    recall: remain=${String(r.remain)} blockedFor=${String(r.blockedFor)} cost=${String(r.cost)} money=${String(r.money)}`
    )
  }
  lines.push(...probeLines(press))
  for (const said of press.said) lines.push(`    said: ${said}`)
  return lines
}

function answerText(a: z.infer<typeof ANSWER>): string {
  return (
    `x=${String(a.xLoc)} y=${String(a.yLoc)} radius=${String(a.areaRadius)} pin=${String(a.pinType)}` +
    ` insideCurrentMapWorld=${String(a.insideCurrentMapWorld)} breadcrumb=${String(a.isBreadcrumb)}` +
    ` teleportNPC=${String(a.teleportNPCId)} waypoint=${String(a.waypointId)} symbolic=${String(a.symbolicState)}` +
    ` extra=(${String(a.additionalSymbolicLocX)}, ${String(a.additionalSymbolicLocY)})`
  )
}

function universalText(at: z.infer<typeof UNIVERSAL> | undefined): string {
  return at === undefined ? "" : ` universal (${String(at.x)}, ${String(at.y)})`
}

function probeLines(press: PressReading): readonly string[] {
  const lines: string[] = []
  const player = press.player
  if (player !== undefined) {
    lines.push(
      `    player at (${String(player.x)}, ${String(player.y)})${universalText(player.universal)} on ${mapLine(player.map)}`
    )
  }
  for (const probe of press.probes ?? []) {
    lines.push(`    probe ${probe.label} -> ${String(probe.result)}: ${mapLine(probe.map)}`)
    if (probe.answer !== undefined) {
      lines.push(`      answer: ${answerText(probe.answer)}${universalText(probe.universal)}`)
    } else {
      lines.push(probe.timedOut === true ? "      no answer in time" : "      not asked")
    }
  }
  return lines
}

function assistedLines(label: string, read: AssistedRead | undefined): readonly string[] {
  if (read === undefined) return [`    ${label}: not read`]
  const lines = [
    `    ${label}: quest ${String(read.journalIndex ?? "-")} "${read.questName ?? ""}"` +
      ` header "${read.headerText ?? ""}"${flag(read.headerHidden, "header-hidden")}${flag(read.panelHidden, "panel-hidden")}`,
  ]
  const list = read.taskList
  if (list === undefined) {
    lines.push("      task list: not read")
    return lines
  }
  lines.push(
    `      task list: focused "${list.assistedName ?? ""}" last synced "${list.lastSyncedName ?? ""}"` +
      ` redraws ${String(list.refreshCount)} last at t=${String(list.lastRefreshAt ?? "-")}`
  )
  for (const quest of list.quests) {
    if (!quest.assistedWithZero && !quest.assistedWithNil) continue
    lines.push(
      `        ${String(quest.journalIndex)}: "${quest.name}" assisted with 0=${String(quest.assistedWithZero)} with nil=${String(quest.assistedWithNil)}`
    )
  }
  if (list.drawn !== undefined) lines.push(...drawnLines(list.drawn))
  return lines
}

function colorOf(label: z.infer<typeof LABEL_DRAWN>): string {
  return `rgba(${label.r.toFixed(2)},${label.g.toFixed(2)},${label.b.toFixed(2)},${label.a.toFixed(2)})`
}

export function drawnLines(drawn: z.infer<typeof DRAWN>): readonly string[] {
  const window = drawn.window
  const lines = [
    `        drawn: exit=${drawn.exit ?? "-"}` +
      (window === undefined
        ? " window not read"
        : ` window "${window.name}"${flag(window.hidden, "hidden")}${flag(window.controlHidden, "control-hidden")}` +
          ` alpha=${String(window.alpha)} at (${String(window.left)}, ${String(window.top)}) ${String(window.width)}x${String(window.height)}`) +
      `${flag(drawn.contentHidden, "content-hidden")} content-children=${String(drawn.contentChildren ?? "-")}` +
      `${flag(drawn.emptyHidden, "empty-hidden")} fragment-showing=${String(drawn.fragmentShowing ?? "-")}`,
  ]
  for (const named of drawn.named) {
    lines.push(
      `          named "${named.name}" ${named.exists ? "exists" : "absent"}${flag(named.hidden, "hidden")}${flag(named.controlHidden, "control-hidden")}`
    )
  }
  for (const row of drawn.rows) {
    const labels = row.labels.map((label) => `"${label.text}" ${colorOf(label)}`).join(" | ")
    lines.push(
      `          row "${row.name}" y=${String(row.offsetY ?? "-")}${flag(row.hidden, "hidden")}${flag(row.controlHidden, "control-hidden")}: ${labels}`
    )
  }
  return lines
}

export function assistMoveLines(move: AssistMoveReading): readonly string[] {
  return [
    `t=${String(move.at)} next quest by ${move.character}`,
    ...assistedLines("before", move.before),
    ...assistedLines("after", move.after),
    ...assistedLines("later", move.later),
  ]
}
