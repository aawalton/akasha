import { z } from "zod"

export const OVERLOAD_STATUS = 529

export const CONNECTION_STATUS = 502

const SERVER_ERROR = "server_error"

export const FAILED_AUTH = "authentication_failed"

const DEATHS: ReadonlySet<unknown> = new Set([SERVER_ERROR, FAILED_AUTH])

interface DeathReading {
  readonly detected: boolean
  readonly consecutive: number
  readonly statuses: readonly (number | null)[]
  readonly errors: readonly string[]
}

const ASSISTANT_RECORD = z.looseObject({ type: z.literal("assistant") })

function assistantRecords(text: string): Record<string, unknown>[] {
  const held: Record<string, unknown>[] = []
  for (const raw of text.split("\n")) {
    if (raw.trim() === "") continue
    let line: Record<string, unknown> | undefined
    try {
      line = ASSISTANT_RECORD.safeParse(JSON.parse(raw)).data
    } catch {
      continue
    }
    if (line !== undefined) held.push(line)
  }
  return held
}

function deathOf(
  record: Record<string, unknown>
): { readonly status: number | null; readonly error: string } | null {
  const error = record.error
  if (record.isApiErrorMessage !== true || typeof error !== "string" || !DEATHS.has(error)) {
    return null
  }
  const status = record.apiErrorStatus
  return { status: typeof status === "number" ? status : null, error }
}

export function classifyTurnEndErrorDeath(text: string): DeathReading {
  const assistants = assistantRecords(text)
  const statuses: (number | null)[] = []
  const errors: string[] = []
  for (let at = assistants.length - 1; at >= 0; at--) {
    const one = assistants[at]
    if (one === undefined) break
    const death = deathOf(one)
    if (death === null) break
    statuses.unshift(death.status)
    errors.unshift(death.error)
  }
  return { detected: statuses.length > 0, consecutive: statuses.length, statuses, errors }
}
