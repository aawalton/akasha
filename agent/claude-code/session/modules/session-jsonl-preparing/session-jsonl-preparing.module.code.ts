import {
  MODELED_CONTENT_BLOCK_TYPES,
  RawSessionLine,
} from "akasha/agent/claude-code/session/modules/session-jsonl-schema/session-jsonl-schema.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

interface TranscriptSanitizeResult {
  readonly text: string
  readonly changed: boolean
  readonly quarantined: ReadonlyMap<string, number>
}

function quarantinePlaceholder(type: string): { type: "text"; text: string } {
  return { type: "text", text: `[${type} block removed during transcript sanitization]` }
}

const ContentBearingLine = SHAPE.looseObject({
  message: SHAPE.looseObject({
    content: SHAPE.array(SHAPE.looseObject({ type: SHAPE.string() })),
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
