import { answer } from "akasha/seat-system/supervisor-decide/supervisor-decide.module.code.ts"
import { isRecord } from "akasha/utils/narrow/is-record/is-record.module.code.ts"

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

export const SUPERVISOR_DECIDE_COMMAND = "supervisor-decide"

type DecideAnswer = ReturnType<typeof answer>

function parseDecideQuestion(held: unknown): Record<string, unknown> {
  if (!isRecord(held)) throw new Error("the payload is not an object")
  return held
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
