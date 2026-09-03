import type { answer } from "../supervisor-decide/supervisor-decide.module.code.ts"

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

export const SUPERVISOR_DECIDE_CEILING_MS = 5_000

// The specifier here is the one the type import above holds, so moving the decide module is a
// diagnostic rather than a path that is not there when a decision is asked for.
const SUPERVISOR_DECIDE_AT = new URL(
  "../supervisor-decide/supervisor-decide.module.code.ts",
  import.meta.url
).pathname

/** What the decide command answers. Callers narrow it themselves. */
type DecideAnswer = ReturnType<typeof answer>

export function askSupervisorDecide(stdin: string): Promise<unknown> {
  return askCommandAt(SUPERVISOR_DECIDE_AT, stdin)
}

async function askCommandAt(entry: string, stdin: string): Promise<DecideAnswer> {
  const proc = Bun.spawn({
    cmd: [process.execPath, entry],
    stdin: new TextEncoder().encode(stdin),
    stdout: "pipe",
    stderr: "pipe",
  })
  const ceiling = setTimeout(() => proc.kill(), SUPERVISOR_DECIDE_CEILING_MS)
  try {
    const [out, err, code] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
      proc.exited,
    ])
    if (code !== 0) throw new Error(`${entry} exited ${code}: ${err.trim()}`)
    return JSON.parse(out) as DecideAnswer
  } finally {
    clearTimeout(ceiling)
  }
}
