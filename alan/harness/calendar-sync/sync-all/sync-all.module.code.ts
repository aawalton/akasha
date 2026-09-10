import type { SyncResult } from "../sync-result/sync-result.module.code.ts"
import type { CalendarSource } from "../sync-source/sync-source.module.code.ts"

export const SOURCE_SLUG = "calendar-event-source"

export type SourceRow = {
  readonly values: Readonly<Record<string, unknown>>
}

export type SyncAllOptions = {
  sourceSlug?: string
  dryRun?: boolean
}

function stringAt(row: SourceRow, key: string): string {
  const value = row.values[key]
  return typeof value === "string" ? value : ""
}

export function sourceOf(row: SourceRow): CalendarSource | null {
  const name = stringAt(row, "external-id")
  const baseUrl = stringAt(row, "base-url")
  const providerClient = stringAt(row, "provider-client")
  const timeZone = stringAt(row, "timezone")
  if (name === "" || baseUrl === "" || providerClient === "" || timeZone === "") return null
  return { name, baseUrl, providerClient, timeZone }
}

export function targetsIn(
  rows: readonly SourceRow[],
  only: string | undefined
): readonly CalendarSource[] {
  const wanted: CalendarSource[] = []
  for (const row of rows) {
    if (stringAt(row, "sync-status") === "disabled") continue
    const source = sourceOf(row)
    if (source === null) continue
    if (only != null && source.name !== only) continue
    wanted.push(source)
  }
  return wanted
}

const NO_SOURCE_READING =
  "nothing here reads the sources yet. ask `@akasha/pages-service/calling` for every `calendar-event-source` page and hand its rows to `targetsIn`"

export async function syncAll(_options: SyncAllOptions = {}): Promise<SyncResult> {
  throw new Error(`calendar sync could not read its sources — ${NO_SOURCE_READING}`)
}
