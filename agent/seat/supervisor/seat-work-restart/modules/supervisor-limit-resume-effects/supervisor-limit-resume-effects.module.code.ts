import { z } from "zod"

const ASSISTANT_LINE = z.looseObject({ type: z.literal("assistant") })

export function classifyRateLimitDeath(text: string): boolean {
  let lastAssistant: Record<string, unknown> | null = null
  for (const raw of text.split("\n")) {
    if (raw.trim() === "") continue
    let line: Record<string, unknown> | undefined
    try {
      line = ASSISTANT_LINE.safeParse(JSON.parse(raw)).data
    } catch {
      continue
    }
    if (line !== undefined) lastAssistant = line
  }
  if (lastAssistant === null) return false
  return lastAssistant.isApiErrorMessage === true && lastAssistant.apiErrorStatus === 429
}
