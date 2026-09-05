import { answer } from "../supervisor-decide/supervisor-decide.module.code.ts"

export function classifyRateLimitDeath(text: string): boolean {
  let lastAssistant: Record<string, unknown> | null = null
  for (const raw of text.split("\n")) {
    if (raw.trim() === "") continue
    let line: unknown
    try {
      line = JSON.parse(raw)
    } catch {
      continue
    }
    if (typeof line !== "object" || line === null || Array.isArray(line)) continue
    const record = line as Record<string, unknown>
    if (record.type === "assistant") lastAssistant = record
  }
  if (lastAssistant === null) return false
  return lastAssistant.isApiErrorMessage === true && lastAssistant.apiErrorStatus === 429
}

export const SUPERVISOR_DECIDE_COMMAND = "supervisor-decide"

/** What the decide module answers. Callers narrow it themselves. */
type DecideAnswer = ReturnType<typeof answer>

// Every caller states its question as JSON, so that is what arrives here. The answering is a call
// rather than a program, so a question that is no use is a throw rather than an exit code.
function decided(stdin: string): DecideAnswer {
  const payload: unknown = JSON.parse(stdin)
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("the payload is not an object")
  }
  return answer(payload as Record<string, unknown>)
}

// Every caller stages this as a promise and catches a rejection, so a throw is handed back that
// way rather than raised at the call.
export function askSupervisorDecide(stdin: string): Promise<unknown> {
  try {
    return Promise.resolve(decided(stdin))
  } catch (error) {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)))
  }
}
