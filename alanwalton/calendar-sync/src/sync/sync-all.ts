import { askNamed, patchPage } from "@shared/pages-query"
import type { QueryRow } from "@shared/pages-query/answer-schema"
import { combineResults, type SyncResult } from "./sync-result"
import { type CalendarSource, syncSource, WRITER } from "./sync-source"
import { trackSyncRun } from "./track-sync-run"

export const SOURCE_SLUG = "calendar-event-source"
export const SOURCES_QUERY = "calendar-event-sources-all"

export type SyncAllOptions = {
  sourceSlug?: string
  dryRun?: boolean
}

function stringAt(row: QueryRow, key: string): string {
  const value = row.values[key]
  return typeof value === "string" ? value : ""
}

export function sourceOf(row: QueryRow): CalendarSource | null {
  const name = stringAt(row, "external-id")
  const baseUrl = stringAt(row, "base-url")
  const providerClient = stringAt(row, "provider-client")
  const timeZone = stringAt(row, "timezone")
  if (name === "" || baseUrl === "" || providerClient === "" || timeZone === "") return null
  return { name, baseUrl, providerClient, timeZone }
}

export function targetsIn(
  rows: readonly QueryRow[],
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

async function markSource(
  name: string,
  values: Readonly<Record<string, string>>
): Promise<undefined> {
  const landed = await patchPage(SOURCE_SLUG, name, values, WRITER)
  if (!landed.ok) console.error(`${name}: its sync state did not land: ${landed.why}`)
}

export async function syncAll(options: SyncAllOptions = {}): Promise<SyncResult> {
  const asked = await askNamed(SOURCES_QUERY)
  if (!asked.ok) throw new Error(`calendar sync could not read its sources: ${asked.why}`)

  const targets = targetsIn(asked.answer.rows, options.sourceSlug)
  if (options.sourceSlug != null && targets.length === 0) {
    throw new Error(`no calendar-event-source with externalId "${options.sourceSlug}"`)
  }

  const results: SyncResult[] = []
  const failures: string[] = []

  for (const source of targets) {
    console.log(`\n--- Syncing ${source.name} ---`)
    try {
      const runOnce = () => syncSource(source, { nowMs: Date.now(), dryRun: options.dryRun })
      const result = options.dryRun ? await runOnce() : await trackSyncRun(source.name, runOnce)
      results.push(result)
      console.log(`${source.name}: written=${result.written} failed=${result.failed}`)
      if (!options.dryRun) {
        await markSource(source.name, {
          "sync-status": result.failed > 0 ? "error" : "active",
          "last-synced-at": new Date().toISOString(),
          "sync-error": "",
        })
      }
    } catch (err) {
      failures.push(source.name)
      console.error(`${source.name} sync failed:`, err)
      if (!options.dryRun) {
        await markSource(source.name, {
          "sync-status": "error",
          "sync-error": String(err).slice(0, 2000),
        })
      }
    }
  }

  const total = combineResults(results)
  console.log(
    `\n--- Done --- sources=${targets.length} written=${total.written} failed=${total.failed}`
  )
  if (failures.length > 0) {
    throw new Error(`calendar sync: ${failures.length} source(s) failed: ${failures.join(", ")}`)
  }
  return total
}
