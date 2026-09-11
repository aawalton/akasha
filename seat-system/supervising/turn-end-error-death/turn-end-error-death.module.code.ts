import { isRecord } from "akasha/utils/narrow/is-record/is-record.module.code.ts"

export const OVERLOAD_STATUS = 529

export const CONNECTION_STATUS = 502

export const RESUME_STATUSES: readonly number[] = [OVERLOAD_STATUS, CONNECTION_STATUS]

export interface DeathReading {
  readonly detected: boolean
  readonly consecutive: number
  readonly statuses: readonly number[]
}

function assistantRecords(text: string): Record<string, unknown>[] {
  const held: Record<string, unknown>[] = []
  for (const raw of text.split("\n")) {
    if (raw.trim() === "") continue
    let line: unknown = null
    try {
      line = JSON.parse(raw)
    } catch {
      continue
    }
    if (!isRecord(line)) continue
    if (line.type === "assistant") held.push(line)
  }
  return held
}

function deathStatus(record: Record<string, unknown>): number | null {
  if (record.isApiErrorMessage !== true) return null
  const status = record.apiErrorStatus
  return typeof status === "number" ? status : null
}

export function classifyTurnEndErrorDeath(
  text: string,
  statuses: readonly number[] = RESUME_STATUSES
): DeathReading {
  const assistants = assistantRecords(text)
  const trailing: number[] = []
  for (let at = assistants.length - 1; at >= 0; at--) {
    const one = assistants[at]
    if (one === undefined) break
    const status = deathStatus(one)
    if (status === null || !statuses.includes(status)) break
    trailing.unshift(status)
  }
  return { detected: trailing.length > 0, consecutive: trailing.length, statuses: trailing }
}
