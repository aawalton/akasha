import { patchRow } from "@shared/pages-query"
import { fetchAllEvents } from "../communico/client"
import { caldataEventToPageProps, type MapContext } from "../map/to-page"
import { emptyResult, type SyncResult } from "./sync-result"

export const EVENT_SLUG = "calendar-event"
export const WRITER = "calendar-sync"

export type CalendarSource = {
  readonly name: string
  readonly baseUrl: string
  readonly providerClient: string
  readonly timeZone: string
}

export type SyncSourceOptions = {
  nowMs: number
  dryRun?: boolean
}

export async function syncSource(
  source: CalendarSource,
  options: SyncSourceOptions
): Promise<SyncResult> {
  const events = await fetchAllEvents(source.baseUrl, { fromMs: options.nowMs })
  const ctx: MapContext = {
    timeZone: source.timeZone,
    providerClient: source.providerClient,
    nowMs: options.nowMs,
  }

  const result: SyncResult = emptyResult()

  for (const event of events) {
    let values: ReturnType<typeof caldataEventToPageProps>
    try {
      values = caldataEventToPageProps(event, ctx)
    } catch (err) {
      result.failed += 1
      console.error(`map failed for event ${event.id}:`, err)
      continue
    }
    if (options.dryRun) {
      result.written += 1
      continue
    }
    const landed = await patchRow(EVENT_SLUG, source.name, values, WRITER)
    if (landed.ok) result.written += 1
    else {
      result.failed += 1
      console.error(`event ${event.id} did not land: ${landed.why}`)
    }
  }

  return result
}
