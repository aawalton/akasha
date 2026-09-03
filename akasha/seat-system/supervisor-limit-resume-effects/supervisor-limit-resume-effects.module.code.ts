import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"

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

export function askSupervisorDecide(stdin: string): Promise<unknown> {
  return askCommandAt(
    `${rootFor(resolveRoots(), AKASHA)}/tools/${SUPERVISOR_DECIDE_COMMAND}.ts`,
    stdin
  )
}

async function askCommandAt(entry: string, stdin: string): Promise<unknown> {
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
    return JSON.parse(out)
  } finally {
    clearTimeout(ceiling)
  }
}
