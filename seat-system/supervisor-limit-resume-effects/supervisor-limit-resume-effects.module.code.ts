import { answer } from "../supervisor-decide/supervisor-decide.module.code.ts"

function parseTranscriptLine(held: unknown): Record<string, unknown> | null {
  if (typeof held !== "object" || held === null || Array.isArray(held)) return null
  return held as Record<string, unknown>
}

export function classifyRateLimitDeath(text: string): boolean {
  let lastAssistant: Record<string, unknown> | null = null
  for (const raw of text.split("\n")) {
    if (raw.trim() === "") continue
    let record: Record<string, unknown> | null = null
    try {
      const line: unknown = JSON.parse(raw)
      record = parseTranscriptLine(line)
    } catch {
      continue
    }
    if (record === null) continue
    if (record.type === "assistant") lastAssistant = record
  }
  if (lastAssistant === null) return false
  return lastAssistant.isApiErrorMessage === true && lastAssistant.apiErrorStatus === 429
}

export const SUPERVISOR_DECIDE_COMMAND = "supervisor-decide"

type DecideAnswer = ReturnType<typeof answer>

function parseDecideQuestion(held: unknown): Record<string, unknown> {
  if (held === null || typeof held !== "object" || Array.isArray(held)) {
    throw new Error("the payload is not an object")
  }
  return held as Record<string, unknown>
}

function decided(stdin: string): DecideAnswer {
  const payload: unknown = JSON.parse(stdin)
  return answer(parseDecideQuestion(payload))
}

export function askSupervisorDecide(stdin: string): Promise<unknown> {
  try {
    return Promise.resolve(decided(stdin))
  } catch (error) {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)))
  }
}
