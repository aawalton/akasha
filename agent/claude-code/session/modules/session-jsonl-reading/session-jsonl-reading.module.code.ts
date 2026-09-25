import {
  MODELED_TYPES,
  RawSessionLine,
  SessionMessage,
} from "akasha/agent/claude-code/session/modules/session-jsonl-schema/session-jsonl-schema.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const ResultSubtypePresence = SHAPE.looseObject({ subtype: SHAPE.string() })

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

const SessionIdLine = SHAPE.looseObject({ sessionId: SHAPE.string().min(1) })

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
