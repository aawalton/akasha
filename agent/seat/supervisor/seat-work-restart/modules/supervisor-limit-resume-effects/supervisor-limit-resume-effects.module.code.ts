import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"

export function classifyRateLimitDeath(text: string): boolean {
  let lastAssistant: Record<string, unknown> | null = null
  for (const raw of text.split("\n")) {
    if (raw.trim() === "") continue
    let line: unknown = null
    try {
      line = JSON.parse(raw)
    } catch {
      continue
    }
    if (!isRecord(line)) continue
    if (line.type === "assistant") lastAssistant = line
  }
  if (lastAssistant === null) return false
  return lastAssistant.isApiErrorMessage === true && lastAssistant.apiErrorStatus === 429
}
