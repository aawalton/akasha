import { closeSync, openSync, readSync, statSync } from "node:fs"
import { akashaObservedOf } from "../../seat-akasha-read/seat-akasha-read.module.code.ts"
import { keepBesideUnder } from "../../seat-beside/seat-beside.module.code.ts"
import { seatNameForAgent } from "../../seat-presence-read/seat-presence-read.module.code.ts"

export const WORKING_KEY = "turn-working"

const TRANSCRIPT_KEY = "transcript-path"

const ANSWER_ENDED = "end_turn"

const ANSWER_RECORD = "assistant"

const ASKED_RECORD = "user"

const TASK_ID_FROM = "<task-id>"

const TASK_ID_TO = "</task-id>"

const SHELL_TASK = "shell"

const AGENT_TASK = "agent"

const LINE_END = 10

export interface TurnWorking {
  readonly activeTurn?: boolean
  readonly scannedTo?: number
  readonly openShells?: readonly string[]
  readonly openAgents?: readonly string[]
}

export interface Answer {
  readonly kind: string
  readonly stopReason: string | null
}

export interface TaskStart {
  readonly id: string
  readonly kind: string
}

export interface TurnScan {
  readonly answer: Answer | null
  readonly openShells: readonly string[]
  readonly openAgents: readonly string[]
}

export function turnEnded(answer: Answer): boolean {
  return answer.kind === ANSWER_RECORD && answer.stopReason === ANSWER_ENDED
}

export function anyWorking(working: TurnWorking): boolean {
  return working.activeTurn === true
}

export function anyWorkingRead(working: TurnWorking): boolean {
  return working.activeTurn !== undefined
}

export function anyLiveShell(working: TurnWorking): boolean {
  return (working.openShells ?? []).length > 0
}

export function anyLiveSubagent(working: TurnWorking): boolean {
  return (working.openAgents ?? []).length > 0
}

function idsIn(said: unknown): readonly string[] | null {
  if (!Array.isArray(said)) return null
  return said.filter((one): one is string => typeof one === "string" && one !== "")
}

export function keptWorkingIn(said: unknown): TurnWorking {
  if (said === null || typeof said !== "object" || Array.isArray(said)) return {}
  const record = said as {
    activeTurn?: unknown
    scannedTo?: unknown
    openShells?: unknown
    openAgents?: unknown
  }
  const found: {
    activeTurn?: boolean
    scannedTo?: number
    openShells?: readonly string[]
    openAgents?: readonly string[]
  } = {}
  if (typeof record.activeTurn === "boolean") found.activeTurn = record.activeTurn
  if (typeof record.scannedTo === "number" && Number.isFinite(record.scannedTo)) {
    found.scannedTo = record.scannedTo
  }
  const shells = idsIn(record.openShells)
  if (shells !== null) found.openShells = shells
  const agents = idsIn(record.openAgents)
  if (agents !== null) found.openAgents = agents
  return found
}

export function taskStartedIn(said: unknown): TaskStart | null {
  if (said === null || typeof said !== "object") return null
  const record = said as { backgroundTaskId?: unknown; agentId?: unknown; isAsync?: unknown }
  if (typeof record.backgroundTaskId === "string" && record.backgroundTaskId !== "") {
    return { id: record.backgroundTaskId, kind: SHELL_TASK }
  }
  if (typeof record.agentId === "string" && record.agentId !== "" && record.isAsync === true) {
    return { id: record.agentId, kind: AGENT_TASK }
  }
  return null
}

export function taskEndedIn(body: string): string | null {
  const from = body.indexOf(TASK_ID_FROM)
  if (from < 0) return null
  const upTo = body.indexOf(TASK_ID_TO, from)
  if (upTo < 0) return null
  const id = body.slice(from + TASK_ID_FROM.length, upTo)
  return id === "" ? null : id
}

function bodyOf(record: { message?: unknown; content?: unknown }): string {
  if (typeof record.content === "string") return record.content
  const message = record.message
  if (message === null || typeof message !== "object") return ""
  const inner = (message as { content?: unknown }).content
  return typeof inner === "string" ? inner : ""
}

function answerOf(record: { type?: unknown; message?: unknown }): Answer | null {
  const kind = record.type
  if (kind !== ANSWER_RECORD && kind !== ASKED_RECORD) return null
  const message = record.message
  const reason =
    message !== null && typeof message === "object"
      ? (message as { stop_reason?: unknown }).stop_reason
      : null
  return { kind, stopReason: typeof reason === "string" ? reason : null }
}

export function scanRecords(text: string, was: TurnWorking): TurnScan {
  const shells = new Set(was.openShells ?? [])
  const agents = new Set(was.openAgents ?? [])
  let answer: Answer | null = null
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue
    let said: unknown
    try {
      said = JSON.parse(line)
    } catch {
      continue
    }
    if (said === null || typeof said !== "object") continue
    const record = said as {
      type?: unknown
      message?: unknown
      content?: unknown
      toolUseResult?: unknown
    }
    const began = taskStartedIn(record.toolUseResult)
    if (began !== null) {
      if (began.kind === SHELL_TASK) shells.add(began.id)
      else agents.add(began.id)
    }
    const done = taskEndedIn(bodyOf(record))
    if (done !== null) {
      shells.delete(done)
      agents.delete(done)
    }
    const heard = answerOf(record)
    if (heard !== null) answer = heard
  }
  return { answer, openShells: [...shells], openAgents: [...agents] }
}

function bytesOf(path: string, from: number, upTo: number): Buffer | null {
  const length = upTo - from
  if (length <= 0) return Buffer.alloc(0)
  let held: number | null = null
  try {
    held = openSync(path, "r")
    const into = Buffer.alloc(length)
    const read = readSync(held, into, 0, length, from)
    return into.subarray(0, read)
  } catch {
    return null
  } finally {
    if (held !== null) closeSync(held)
  }
}

function keepWorking(agent: string, working: TurnWorking): boolean {
  const seat = seatNameForAgent(agent)
  if (seat === null) return false
  try {
    keepBesideUnder(seat, WORKING_KEY, { ...working })
    return true
  } catch {
    return false
  }
}

export function workingOf(agent: string): TurnWorking {
  if (agent === "") return {}
  const observed = akashaObservedOf(agent)
  if (observed === null) return {}
  const held = keptWorkingIn(observed[WORKING_KEY])
  const path = observed[TRANSCRIPT_KEY]
  if (typeof path !== "string" || path === "") return held
  let size: number
  try {
    size = statSync(path).size
  } catch {
    return held
  }
  const { scannedTo } = held
  if (scannedTo === size && held.activeTurn !== undefined) return held
  const fresh = scannedTo === undefined || size < scannedTo
  const from = fresh ? 0 : scannedTo
  const bytes = bytesOf(path, from, size)
  if (bytes === null) return held
  const ends = bytes.lastIndexOf(LINE_END)
  if (ends < 0) return held
  const whole = bytes.subarray(0, ends + 1)
  const was = fresh ? {} : held
  const found = scanRecords(whole.toString("utf8"), was)
  const activeTurn = found.answer === null ? was.activeTurn : !turnEnded(found.answer)
  const read: TurnWorking = {
    ...(activeTurn === undefined ? {} : { activeTurn }),
    scannedTo: from + whole.length,
    openShells: found.openShells,
    openAgents: found.openAgents,
  }
  keepWorking(agent, read)
  return read
}

export function workingLines(working: TurnWorking): readonly string[] {
  const said =
    working.activeTurn === undefined
      ? "— unread"
      : `${working.activeTurn ? "on" : "off"} (read to byte ${working.scannedTo ?? 0})`
  const shells = working.openShells ?? []
  const agents = working.openAgents ?? []
  return [
    `  ${"active-turn".padEnd(15)} ${said}`,
    `  ${"live-shell".padEnd(15)} ${shells.length === 0 ? "none" : shells.join(", ")}`,
    `  ${"live-subagent".padEnd(15)} ${agents.length === 0 ? "none" : agents.join(", ")}`,
  ]
}
