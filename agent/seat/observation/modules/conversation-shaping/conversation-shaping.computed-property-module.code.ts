import { toolSubject } from "akasha/agent/claude-code/tool/modules/tool-subject/tool-subject.computed-property-module.code.ts"
import { imagesOut } from "akasha/agent/message/modules/attached-images/agent-message-attached-images.computed-property-module.code.ts"
import type { Filed } from "akasha/page/computed-property/computed-property.page-type.ts"

export type PersonSaid = {
  readonly kind: "person"
  readonly text: string
  readonly images: number
  readonly at?: string
}

export type AgentSaid = {
  readonly kind: "agent"
  readonly text: string
  readonly at?: string
}

export type ToolCalled = {
  readonly kind: "tool"
  readonly line: string
  readonly at?: string
}

export type TurnEnded = {
  readonly kind: "turn-end"
  readonly line: string
  readonly at?: string
}

export type MessageSent = {
  readonly kind: "message"
  readonly sender: string
  readonly text: string
  readonly at?: string
}

export type ConversationEntry = PersonSaid | AgentSaid | ToolCalled | TurnEnded | MessageSent

export type Shaped =
  | { readonly compacted: true }
  | { readonly entries: readonly ConversationEntry[] }

type Said = Readonly<Record<string, unknown>>

const PERSON_RECORD = "user"

const AGENT_RECORD = "assistant"

const HARNESS_RECORD = "system"

const ATTACHED_RECORD = "attachment"

const COMPACTION_ENDED = "compact_boundary"

const TURN_TIMED = "turn_duration"

const QUEUED = "queued_command"

const TYPED = "prompt"

const TEXT = "text"

const IMAGE = "image"

const TOOL_USE = "tool_use"

const PARTED = "\n\n"

const HARNESS_WROTE = [
  "<local-command-caveat>",
  "<local-command-stdout>",
  "<command-name>",
  "<task-notification>",
]

const CHANNEL = /^\s*<channel\b([^>]*)>([\s\S]*?)<\/channel>\s*$/

const SENDER = /\bsender="([^"]*)"/

const UNNAMED_SENDER = "system"

const PERSON_SENDER = "alan"

const SECOND_MS = 1_000

const MINUTE_S = 60

const HOUR_S = 3_600

const COMPACTED_AT = '"subtype":"compact_boundary"'

const CHUNK = 4 * 1024 * 1024

const NOTHING: Shaped = { entries: [] }

const COMPACTED: Shaped = { compacted: true }

function saidIn(held: unknown): Said | null {
  return held !== null && typeof held === "object" && !Array.isArray(held) ? (held as Said) : null
}

function recordIn(line: string): Said | null {
  try {
    return saidIn(JSON.parse(line))
  } catch {
    return null
  }
}

function timeOf(record: Said): { readonly at?: string } {
  return typeof record.timestamp === "string" ? { at: record.timestamp } : {}
}

function blocksOf(record: Said): readonly Said[] {
  const content = saidIn(record.message)?.content
  if (typeof content === "string") return [{ type: TEXT, text: content }]
  if (!Array.isArray(content)) return []
  const found: Said[] = []
  for (const one of content) {
    const block = saidIn(one)
    if (block !== null) found.push(block)
  }
  return found
}

function textOf(block: Said): string | null {
  if (block.type !== TEXT || typeof block.text !== "string") return null
  return block.text.trim() === "" ? null : block.text
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

function channelSaid(text: string, at: { readonly at?: string }): ConversationEntry | null {
  const channel = CHANNEL.exec(text)
  if (channel === null) return null
  const sender = SENDER.exec(channel[1] ?? "")?.[1] ?? UNNAMED_SENDER
  const said = (channel[2] ?? "").trim()
  if (sender === PERSON_SENDER) return { kind: "person", ...imagesOut(said), ...at }
  return { kind: "message", sender, text: said, ...at }
}

function personIn(record: Said): Shaped {
  if (record.isCompactSummary === true) return NOTHING
  const blocks = blocksOf(record)
  const texts: string[] = []
  for (const block of blocks) {
    const text = textOf(block)
    if (text !== null) texts.push(text)
  }
  const images = blocks.filter((block) => block.type === IMAGE).length
  if (texts.length === 0 && images === 0) return NOTHING
  const text = texts.join(PARTED)
  const channel = channelSaid(text, timeOf(record))
  if (channel !== null) return { entries: [channel] }
  if (record.isMeta === true || harnessWrote(text)) return NOTHING
  return { entries: [{ kind: "person", text, images, ...timeOf(record) }] }
}

function agentIn(record: Said): Shaped {
  const at = timeOf(record)
  const entries: ConversationEntry[] = []
  for (const block of blocksOf(record)) {
    const text = textOf(block)
    if (text !== null) entries.push({ kind: "agent", text, ...at })
    if (block.type !== TOOL_USE) continue
    const name = typeof block.name === "string" ? block.name : "tool"
    entries.push({ kind: "tool", line: toolLine(name, toolSubject(name, block.input)), ...at })
  }
  return { entries }
}

function harnessIn(record: Said): Shaped {
  if (record.subtype === COMPACTION_ENDED) return COMPACTED
  if (record.subtype !== TURN_TIMED || typeof record.durationMs !== "number") return NOTHING
  return { entries: [{ kind: "turn-end", line: workedFor(record.durationMs), ...timeOf(record) }] }
}

function queuedIn(record: Said): Shaped {
  const attached = saidIn(record.attachment)
  if (attached === null || attached.type !== QUEUED || attached.commandMode !== TYPED) {
    return NOTHING
  }
  const prompt = attached.prompt
  if (typeof prompt !== "string" || prompt.trim() === "") return NOTHING
  const channel = channelSaid(prompt, timeOf(record))
  if (channel !== null) return { entries: [channel] }
  return { entries: [{ kind: "person", text: prompt, images: 0, ...timeOf(record) }] }
}

export function shapedLine(line: string): Shaped {
  const record = recordIn(line)
  if (record === null) return NOTHING
  if (record.type === PERSON_RECORD) return personIn(record)
  if (record.type === AGENT_RECORD) return agentIn(record)
  if (record.type === HARNESS_RECORD) return harnessIn(record)
  if (record.type === ATTACHED_RECORD) return queuedIn(record)
  return NOTHING
}

export function conversationFrom(text: string): readonly ConversationEntry[] {
  let held: ConversationEntry[] = []
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue
    const shaped = shapedLine(line)
    if ("compacted" in shaped) held = []
    else held.push(...shaped.entries)
  }
  return held
}

export function lastCompactionAt(filed: Filed): number {
  const byteWise = new TextDecoder("latin1")
  let upTo = filed.size
  while (upTo > 0) {
    const from = Math.max(0, upTo - CHUNK)
    const seen = byteWise.decode(filed.read(from, Math.min(filed.size, upTo + COMPACTED_AT.length)))
    const at = seen.lastIndexOf(COMPACTED_AT)
    if (at >= 0) return from + seen.lastIndexOf("\n", at) + 1
    upTo = from
  }
  return 0
}

export function conversationOf(filed: Filed): readonly ConversationEntry[] {
  const from = lastCompactionAt(filed)
  return conversationFrom(new TextDecoder().decode(filed.read(from, filed.size)))
}
