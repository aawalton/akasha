import {
  normalizeRecord,
  type ToolResult,
  transcriptLineSchema,
} from "../transcript-records/transcript-records.module.code.ts"

export const FINAL_TEXT_CHARS = 4000

export const PROMPT_TEXT_CHARS = 2000

export const TRAIL_TURNS = 10

export const TRAIL_TEXT_CHARS = 500

export const TRAIL_TOOL_CHARS = 200

const TAIL_BYTES = 512 * 1024

export interface TurnEvidence {
  readonly finalText: string
  readonly promptText: string | null
  readonly pending: boolean
  readonly toolCalls: number
  readonly trail: readonly string[]
}

export async function readTail(path: string, tailBytes = TAIL_BYTES): Promise<readonly string[]> {
  const file = Bun.file(path)
  const size = file.size
  if (size === 0) return []
  const from = size > tailBytes ? size - tailBytes : 0
  const text = await file.slice(from).text()
  const lines = text.split("\n").filter((line) => line.trim() !== "")
  return from === 0 ? lines : lines.slice(1)
}

function clip(text: string, chars: number): string {
  const flat = text.replace(/\s+/g, " ").trim()
  return flat.length <= chars ? flat : `${flat.slice(0, chars)}…`
}

function resultFor(id: string, results: ReadonlyMap<string, ToolResult>): string {
  const found = results.get(id)
  if (found === undefined) return "no result recorded"
  const said = clip(found.text, TRAIL_TOOL_CHARS)
  return said === "" ? "returned nothing" : said
}

export function evidenceFrom(lines: readonly string[]): TurnEvidence | null {
  const records = lines.map((line) => {
    try {
      return normalizeRecord(transcriptLineSchema.parse(JSON.parse(line)))
    } catch {
      return normalizeRecord(null)
    }
  })
  let j = records.length - 1
  while (j >= 0 && records[j]?.kind !== "assistant") j -= 1
  const ended = j >= 0 ? records[j] : undefined
  if (ended === undefined || ended.endsWithToolUse) return null
  const finalText = ended.text.trim()
  if (finalText === "") return null
  let k = j - 1
  while (k >= 0 && records[k]?.kind !== "prompt") k -= 1
  const prompt = k >= 0 ? records[k] : undefined
  const from = k >= 0 ? k + 1 : 0

  const results = new Map<string, ToolResult>()
  for (let i = from; i < records.length; i += 1)
    for (const one of records[i]?.toolResults ?? []) results.set(one.id, one)

  let toolCalls = 0
  const trail: string[] = []
  for (let i = from; i <= j; i += 1) {
    const record = records[i]
    if (record === undefined) continue
    toolCalls += record.toolInputs.length
    const said = record.text.trim()
    if (record.kind === "assistant" && said !== "" && i !== j)
      trail.push(`said: ${clip(said, TRAIL_TEXT_CHARS)}`)
    for (const use of record.toolUses)
      trail.push(
        `called ${use.name}(${clip(use.input, TRAIL_TOOL_CHARS)}) → ${resultFor(use.id, results)}`
      )
  }

  return {
    finalText: finalText.slice(0, FINAL_TEXT_CHARS),
    promptText: prompt === undefined ? null : prompt.text.trim().slice(0, PROMPT_TEXT_CHARS),
    pending: false,
    toolCalls,
    trail: trail.slice(-TRAIL_TURNS),
  }
}
