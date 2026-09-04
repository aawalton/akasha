import { commandPath, runCommand } from "../harness-call/harness-call.module.code.ts"

const CALL_TIMEOUT_MS = 30_000

const MAX_BUFFER = 1024 * 1024

const COMMAND = "claude-usage"

export type Mean = {
  readonly value: number | null
  readonly over: number
}

export type UsageReading = {
  readonly sessionPct: number | null
  readonly weeklyPct: number | null
}

function pctOf(mean: Mean): number | null {
  return mean.over === 0 ? null : mean.value
}

function meanIn(held: Record<string, unknown>, field: string): Mean {
  const raw = held[field]
  if (raw === null || typeof raw !== "object") {
    throw new Error(`${COMMAND}: the answer carries no \`${field}\` mean`)
  }
  const one = raw as Record<string, unknown>
  if (typeof one.over !== "number") {
    throw new Error(
      `${COMMAND}: \`${field}.over\` is not a number, so nothing says how many accounts were read`
    )
  }
  if (one.value !== null && typeof one.value !== "number") {
    throw new Error(`${COMMAND}: \`${field}.value\` is neither a number nor null`)
  }
  return { value: one.value as number | null, over: one.over }
}

export async function readUsage(): Promise<UsageReading> {
  const stdout = await runCommand(commandPath(COMMAND), [], {
    timeout: CALL_TIMEOUT_MS,
    maxBuffer: MAX_BUFFER,
  })
  let answered: unknown
  try {
    answered = JSON.parse(stdout)
  } catch (err) {
    throw new Error(`${COMMAND} did not print JSON: ${String(err)}`)
  }
  if (answered === null || typeof answered !== "object") {
    throw new Error(`${COMMAND}: the answer is not an object, so it names no figure at all`)
  }
  const held = answered as Record<string, unknown>
  return {
    sessionPct: pctOf(meanIn(held, "session")),
    weeklyPct: pctOf(meanIn(held, "weekly")),
  }
}
