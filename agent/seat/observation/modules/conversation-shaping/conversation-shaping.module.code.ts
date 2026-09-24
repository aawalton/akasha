import {
  type Entry,
  emptyEntryFold,
  foldEntryLine,
} from "akasha/code/editor/extension/modules/transcript-model/transcript-model.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"

export type PersonSaid = {
  readonly kind: "person"
  readonly text: string
  readonly images: number
  readonly at: string | null
}

export type AgentSaid = {
  readonly kind: "agent"
  readonly text: string
  readonly at: string | null
}

export type ToolCalled = {
  readonly kind: "tool"
  readonly line: string
  readonly at: string | null
}

export type TurnEnded = {
  readonly kind: "turn-end"
  readonly line: string
  readonly at: string | null
}

export type ConversationEntry = PersonSaid | AgentSaid | ToolCalled | TurnEnded

export type Shaped =
  | { readonly compacted: true }
  | { readonly entries: readonly ConversationEntry[] }

const PERSON_RECORD = "user"

const AGENT_RECORD = "assistant"

const HARNESS_RECORD = "system"

const ATTACHED_RECORD = "attachment"

const COMPACTION_ENDED = "compact_boundary"

const TURN_TIMED = "turn_duration"

const QUEUED = "queued_command"

const TYPED = "prompt"

const IMAGE = "image"

const PARTED = "\n\n"

const HARNESS_WROTE = [
  "<local-command-caveat>",
  "<local-command-stdout>",
  "<command-name>",
  "<task-notification>",
]

const SECOND_MS = 1_000

const MINUTE_S = 60

const HOUR_S = 3_600

const NOTHING: Shaped = { entries: [] }

const COMPACTED: Shaped = { compacted: true }

function recordIn(line: string): Record<string, unknown> | null {
  try {
    const held: unknown = JSON.parse(line)
    return isRecord(held) ? held : null
  } catch {
    return null
  }
}

function timeOf(record: Record<string, unknown>): string | null {
  return typeof record.timestamp === "string" ? record.timestamp : null
}

function imagesIn(record: Record<string, unknown>): number {
  const message = record.message
  const content = isRecord(message) ? message.content : undefined
  if (!Array.isArray(content)) return 0
  return content.filter((block) => isRecord(block) && block.type === IMAGE).length
}

function harnessWrote(text: string): boolean {
  const opens = text.trimStart()
  return HARNESS_WROTE.some((one) => opens.startsWith(one))
}

export function workedFor(ms: number): string {
  const whole = Math.round(ms / SECOND_MS)
  const hours = Math.floor(whole / HOUR_S)
  const minutes = Math.floor((whole % HOUR_S) / MINUTE_S)
  const seconds = whole % MINUTE_S
  if (hours > 0) return `Worked for ${hours}h ${minutes}m ${seconds}s`
  if (minutes > 0) return `Worked for ${minutes}m ${seconds}s`
  return `Worked for ${seconds}s`
}

export function toolLine(name: string, subject: string): string {
  return subject === "" ? name : `${name}(${subject})`
}

function foldedIn(line: string): readonly Entry[] {
  const fold = emptyEntryFold()
  foldEntryLine(fold, line)
  return fold.entries
}

function personIn(record: Record<string, unknown>, line: string): Shaped {
  if (record.isMeta === true || record.isCompactSummary === true) return NOTHING
  const texts: string[] = []
  for (const one of foldedIn(line)) if (one.kind === PERSON_RECORD) texts.push(one.text)
  const images = imagesIn(record)
  if (texts.length === 0 && images === 0) return NOTHING
  const text = texts.join(PARTED)
  if (harnessWrote(text)) return NOTHING
  return { entries: [{ kind: "person", text, images, at: timeOf(record) }] }
}

function agentIn(record: Record<string, unknown>, line: string): Shaped {
  const at = timeOf(record)
  const entries: ConversationEntry[] = []
  for (const one of foldedIn(line)) {
    if (one.kind === AGENT_RECORD) entries.push({ kind: "agent", text: one.text, at })
    if (one.kind === "tool")
      entries.push({ kind: "tool", line: toolLine(one.name, one.subject), at })
  }
  return { entries }
}

function harnessIn(record: Record<string, unknown>): Shaped {
  if (record.subtype === COMPACTION_ENDED) return COMPACTED
  if (record.subtype !== TURN_TIMED || typeof record.durationMs !== "number") return NOTHING
  return { entries: [{ kind: "turn-end", line: workedFor(record.durationMs), at: timeOf(record) }] }
}

function queuedIn(record: Record<string, unknown>): Shaped {
  const attached = record.attachment
  if (!isRecord(attached) || attached.type !== QUEUED || attached.commandMode !== TYPED) {
    return NOTHING
  }
  const prompt = attached.prompt
  if (typeof prompt !== "string" || prompt.trim() === "") return NOTHING
  return { entries: [{ kind: "person", text: prompt, images: 0, at: timeOf(record) }] }
}

export function shapedLine(line: string): Shaped {
  const record = recordIn(line)
  if (record === null) return NOTHING
  if (record.type === PERSON_RECORD) return personIn(record, line)
  if (record.type === AGENT_RECORD) return agentIn(record, line)
  if (record.type === HARNESS_RECORD) return harnessIn(record)
  if (record.type === ATTACHED_RECORD) return queuedIn(record)
  return NOTHING
}

export function conversationFrom(
  text: string,
  was: readonly ConversationEntry[] = []
): readonly ConversationEntry[] {
  let held: ConversationEntry[] = [...was]
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue
    const shaped = shapedLine(line)
    if ("compacted" in shaped) held = []
    else held.push(...shaped.entries)
  }
  return held
}

export function conversationBody(entries: readonly ConversationEntry[]): string {
  return entries.map((one) => `${JSON.stringify(one)}\n`).join("")
}
