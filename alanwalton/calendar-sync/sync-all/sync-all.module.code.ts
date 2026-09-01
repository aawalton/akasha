import type { SyncResult } from "../sync-result/sync-result.module.code.ts"
import type { CalendarSource } from "../sync-source/sync-source.module.code.ts"

export const SOURCE_SLUG = "calendar-event-source"
export const SOURCES_QUERY = "calendar-event-sources-all"

// A row as any answering store hands one over: the values it was asked for, under the keys it was
// asked for them by. This was imported from the old engine's `answer-schema`, which stopped
// exporting the name, and `targetsIn` below never wanted more of a row than this.
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

// THIS CRON HAS STOPPED AT ITS FIRST STATEMENT EVERY DAY SINCE 4c1f05a264. `syncAll` asked the
// saved query `calendar-event-sources-all` for the calendars to sync, and a saved query was a file
// in the checkout that commit severed, so `askNamed` refuses every slug. The job runs at 08:40,
// threw on the refusal, and never reached a calendar. It says so itself now.
//
// Nothing downstream of it worked either, so restoring the read alone would not restore the sync:
// `syncSource` landed each event with `patchRow` and `trackSyncRun` opened and settled its run
// with `writeRow` and `patchPage`, and the store refuses all three. Marking a source's sync state
// afterwards went through `patchPage` as well. The whole chain wrote nothing.
//
// What the query asked for is plain, and the narrowing above already runs over rows, so the
// service can answer it directly — `{ pageTypeSlug: "calendar-event-source", keys: ["external-id",
// "base-url", "provider-client", "timezone", "sync-status"] }` — with `targetsIn` taking the rows
// as it does today. The writes are the harder half and want a body, not keys.
const NO_SAVED_QUERY =
  "a saved query is answered by the page engine that has been removed. ask `@akasha/pages-system-service/calling` for every `calendar-event-source` page and hand its rows to `targetsIn`"

export async function syncAll(_options: SyncAllOptions = {}): Promise<SyncResult> {
  throw new Error(
    `calendar sync could not read its sources: \`${SOURCES_QUERY}\` went unasked — ${NO_SAVED_QUERY}`
  )
}
