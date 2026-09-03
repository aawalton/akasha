import { shape } from "@tools/lib/shape"
import type { AssistantMessage } from "../session-jsonl-schema/session-jsonl-schema.module.code.ts"
import {
  MODELED_CONTENT_BLOCK_TYPES,
  MODELED_TYPES,
  RawSessionLine,
  SessionMessage,
} from "../session-jsonl-schema/session-jsonl-schema.module.code.ts"

const ResultSubtypePresence = shape.looseObject({ subtype: shape.string() })

export function parseSessionLine(line: string): SessionMessage | null {
  let json: unknown
  try {
    json = RawSessionLine.parse(JSON.parse(line))
  } catch {
    return null
  }
  if (typeof json !== "object" || json === null || Array.isArray(json)) return null
  if (!("type" in json)) return null
  const type = json.type
  if (typeof type !== "string" || !MODELED_TYPES.has(type)) return null
  if (type === "result" && !ResultSubtypePresence.safeParse(json).success) return null
  return SessionMessage.parse(json)
}

export function parseSessionLines(text: string): readonly SessionMessage[] {
  const out: SessionMessage[] = []
  for (const raw of text.split("\n")) {
    if (raw.trim() === "") continue
    const msg = parseSessionLine(raw)
    if (msg !== null) out.push(msg)
  }
  return out
}

export function classifyRateLimitDeath(text: string): boolean {
  let lastAssistant: AssistantMessage | null = null
  for (const msg of parseSessionLines(text)) {
    if (msg.type === "assistant") lastAssistant = msg
  }
  if (lastAssistant === null) return false
  return lastAssistant.isApiErrorMessage === true && lastAssistant.apiErrorStatus === 429
}

export function extractServedModel(text: string): string | null {
  let served: string | null = null
  for (const msg of parseSessionLines(text)) {
    if (msg.type !== "assistant") continue
    if (msg.isApiErrorMessage === true) continue
    const model = msg.message.model
    if (model?.startsWith("claude-")) served = model
  }
  return served
}

const SessionIdLine = shape.looseObject({ sessionId: shape.string().min(1) })

export function readTranscriptSessionId(text: string): string | null {
  for (const raw of text.split("\n")) {
    if (raw.trim() === "") continue
    let parsed: ReturnType<(typeof SessionIdLine)["safeParse"]>
    try {
      parsed = SessionIdLine.safeParse(JSON.parse(raw))
    } catch {
      continue
    }
    if (parsed.success) return parsed.data.sessionId
  }
  return null
}

export interface TranscriptSanitizeResult {
  readonly text: string
  readonly changed: boolean
  readonly quarantined: ReadonlyMap<string, number>
}

function quarantinePlaceholder(type: string): { type: "text"; text: string } {
  return { type: "text", text: `[${type} block removed during transcript sanitization]` }
}

const ContentBearingLine = shape.looseObject({
  message: shape.looseObject({
    content: shape.array(shape.looseObject({ type: shape.string() })),
  }),
})

export function sanitizeTranscriptForResume(text: string): TranscriptSanitizeResult {
  const quarantined = new Map<string, number>()
  let changed = false

  const outLines = text.split("\n").map((line) => {
    if (line.trim() === "") return line
    let raw: unknown
    try {
      raw = RawSessionLine.parse(JSON.parse(line))
    } catch {
      return line
    }
    const parsed = ContentBearingLine.safeParse(raw)
    if (!parsed.success) return line

    const obj = parsed.data
    let lineChanged = false
    const sanitizedContent = obj.message.content.map((block) => {
      if (MODELED_CONTENT_BLOCK_TYPES.has(block.type)) return block
      quarantined.set(block.type, (quarantined.get(block.type) ?? 0) + 1)
      lineChanged = true
      return quarantinePlaceholder(block.type)
    })

    if (!lineChanged) return line
    changed = true
    return JSON.stringify({ ...obj, message: { ...obj.message, content: sanitizedContent } })
  })

  return { text: outLines.join("\n"), changed, quarantined }
}
