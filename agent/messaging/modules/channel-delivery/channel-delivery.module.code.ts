import { z } from "zod"

export const TURN_MARGIN = 4

const OPENING_WRAPPER = /^\s*<channel\b[^>]*?\bmessage_id=\\?"([^"\\]+)/
const RECORD_LINE_ID =
  /(?:^|\n)([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(?=\t|\n|$)/g

const WRAPPER_MATCH = z.tuple([z.string(), z.string()])

export function openingChannelMessageId(field: string): string | null {
  const match = WRAPPER_MATCH.safeParse(OPENING_WRAPPER.exec(field))
  return match.success ? match.data[1] : null
}

export type DeliveryRecordKind = "enqueue" | "injection" | "self-read" | "turn-end"

export interface DeliveryRecord {
  readonly kind: DeliveryRecordKind
  readonly messageId: string | null
}

const QueueOpLine = z.looseObject({
  type: z.literal("queue-operation"),
  operation: z.string(),
  content: z.string().optional(),
})

const AttachmentLine = z.looseObject({
  type: z.literal("attachment"),
  attachment: z.looseObject({ type: z.string(), prompt: z.string().optional() }),
})

const AssistantLine = z.looseObject({
  type: z.literal("assistant"),
  message: z.looseObject({ stop_reason: z.string().nullable().optional() }),
})

const UserLine = z.looseObject({
  type: z.literal("user"),
  message: z.looseObject({
    content: z.union([
      z.string(),
      z.array(z.looseObject({ type: z.string(), content: z.unknown().optional() })),
    ]),
  }),
})

const TextBlocks = z.array(z.looseObject({ text: z.string().optional() }))

function blockText(content: unknown): string {
  if (typeof content === "string") return content
  const blocks = TextBlocks.safeParse(content)
  if (!blocks.success) return ""
  return blocks.data.map((b) => b.text ?? "").join("\n")
}

function toolResultIds(blocks: readonly { type: string; content?: unknown }[]): readonly string[] {
  const ids: string[] = []
  for (const block of blocks) {
    if (block.type !== "tool_result") continue
    for (const match of blockText(block.content).matchAll(RECORD_LINE_ID)) {
      const id = match[1]
      if (id !== undefined && !ids.includes(id)) ids.push(id)
    }
  }
  return ids
}

const TranscriptLine = z.looseObject({ type: z.string() })

function parseTranscriptLine(line: string): { readonly type: string } | null {
  try {
    const json: unknown = JSON.parse(line)
    const parsed = TranscriptLine.safeParse(json)
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

function recordsForLine(line: string): readonly DeliveryRecord[] {
  const json = parseTranscriptLine(line)
  if (json === null) return []

  const queueOp = QueueOpLine.safeParse(json)
  if (queueOp.success) {
    if (queueOp.data.operation !== "enqueue") return []
    const id = openingChannelMessageId(queueOp.data.content ?? "")
    return id === null ? [] : [{ kind: "enqueue", messageId: id }]
  }

  const attachment = AttachmentLine.safeParse(json)
  if (attachment.success) {
    if (attachment.data.attachment.type !== "queued_command") return []
    const id = openingChannelMessageId(attachment.data.attachment.prompt ?? "")
    return id === null ? [] : [{ kind: "injection", messageId: id }]
  }

  const assistant = AssistantLine.safeParse(json)
  if (assistant.success) {
    return assistant.data.message.stop_reason === "end_turn"
      ? [{ kind: "turn-end", messageId: null }]
      : []
  }

  const user = UserLine.safeParse(json)
  if (user.success) {
    const content = user.data.message.content
    if (typeof content === "string") {
      const id = openingChannelMessageId(content)
      return id === null ? [] : [{ kind: "injection", messageId: id }]
    }
    return toolResultIds(content).map((id) => ({ kind: "self-read", messageId: id }) as const)
  }

  return []
}

export function readDeliveryRecords(text: string): readonly DeliveryRecord[] {
  const out: DeliveryRecord[] = []
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue
    out.push(...recordsForLine(line))
  }
  return out
}

export type TranscriptOutcome = "injected" | "lost" | "not-yet" | "absent"

export type TranscriptGround =
  | "injection"
  | "overtaken"
  | "turns-elapsed"
  | "session-ended"
  | "no-proof"
  | "no-enqueue"

export interface TranscriptFinding {
  readonly outcome: TranscriptOutcome
  readonly ground: TranscriptGround
  readonly turnsSinceEnqueue: number
  readonly overtakenBy: string | null
  readonly selfRead: boolean
}

export function classifyDeliveryRecords(opts: {
  readonly records: readonly DeliveryRecord[]
  readonly messageId: string
  readonly sessionEnded: boolean | null
}): TranscriptFinding {
  const records = opts.records
  const selfRead = records.some((r) => r.kind === "self-read" && r.messageId === opts.messageId)

  const enqueueAt = records.findIndex((r) => r.kind === "enqueue" && r.messageId === opts.messageId)
  if (enqueueAt === -1) {
    return {
      outcome: "absent",
      ground: "no-enqueue",
      turnsSinceEnqueue: 0,
      overtakenBy: null,
      selfRead,
    }
  }

  const laterEnqueued = new Set<string>()
  let turns = 0
  let overtakenBy: string | null = null

  for (const record of records.slice(enqueueAt + 1)) {
    if (record.kind === "turn-end") {
      turns += 1
      continue
    }
    if (record.messageId === null) continue
    if (record.kind === "enqueue") {
      if (record.messageId !== opts.messageId) laterEnqueued.add(record.messageId)
      continue
    }
    if (record.kind !== "injection") continue
    if (record.messageId === opts.messageId) {
      return {
        outcome: "injected",
        ground: "injection",
        turnsSinceEnqueue: turns,
        overtakenBy: null,
        selfRead,
      }
    }
    if (overtakenBy === null && laterEnqueued.has(record.messageId)) {
      overtakenBy = record.messageId
    }
  }

  const ground: TranscriptGround =
    overtakenBy !== null
      ? "overtaken"
      : turns > TURN_MARGIN
        ? "turns-elapsed"
        : opts.sessionEnded === true
          ? "session-ended"
          : "no-proof"

  return {
    outcome: ground === "no-proof" ? "not-yet" : "lost",
    ground,
    turnsSinceEnqueue: turns,
    overtakenBy,
    selfRead,
  }
}

export function classifyTranscriptDelivery(opts: {
  readonly text: string
  readonly messageId: string
  readonly sessionEnded: boolean | null
}): TranscriptFinding {
  return classifyDeliveryRecords({
    records: readDeliveryRecords(opts.text),
    messageId: opts.messageId,
    sessionEnded: opts.sessionEnded,
  })
}

const DELIVERY_VERDICTS = [
  "injected",
  "self-found",
  "lost",
  "not-yet",
  "not-enqueued",
  "undetermined",
] as const

export type DeliveryVerdict = (typeof DELIVERY_VERDICTS)[number]

export type DeliveryReason =
  | TranscriptGround
  | "inbox-read"
  | "never-offered"
  | "outside-retention"
  | "unreadable"
  | "no-row"
  | "bounced"
  | "unclaimed"

export interface DeliveryDecision {
  readonly verdict: DeliveryVerdict
  readonly reason: DeliveryReason
}

export interface AttributedFinding {
  readonly outcome: TranscriptOutcome
  readonly ground: TranscriptGround
  readonly selfRead: boolean
  readonly recipient: boolean
}

export function combineDeliveryFindings(opts: {
  readonly findings: readonly AttributedFinding[]
}): DeliveryDecision {
  if (opts.findings.some((f) => f.outcome === "injected")) {
    return { verdict: "injected", reason: "injection" }
  }
  if (opts.findings.some((f) => f.selfRead && f.recipient)) {
    return { verdict: "self-found", reason: "inbox-read" }
  }

  const observed = opts.findings.filter((f) => f.outcome !== "absent")
  if (observed.length > 0) {
    if (observed.some((f) => f.outcome === "not-yet")) {
      return { verdict: "not-yet", reason: "no-proof" }
    }
    const lost = observed.find((f) => f.outcome === "lost")
    return { verdict: "lost", reason: lost?.ground ?? "never-offered" }
  }

  return { verdict: "undetermined", reason: "no-proof" }
}
