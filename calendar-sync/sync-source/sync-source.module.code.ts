import { fetchAllEvents } from "../caldata-client/caldata-client.module.code.ts"
import {
  caldataEventToPageProps,
  type MapContext,
} from "../event-to-page/event-to-page.module.code.ts"
import { emptyResult, type SyncResult } from "../sync-result/sync-result.module.code.ts"

export const EVENT_SLUG = "calendar-event"
export const WRITER = "calendar-sync"

const NO_ROW =
  "a `calendar-event` row is inside a page's body rather than at a path of its own, and the store writes a path and a whole body. land the body with `writeFiles` or `patchFiles`, or through the akasha command line"

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
    try {
      caldataEventToPageProps(event, ctx)
    } catch (err) {
      result.failed += 1
      console.error(`map failed for event ${event.id}:`, err)
      continue
    }
    if (options.dryRun) {
      result.written += 1
      continue
    }
    result.failed += 1
    console.error(`event ${event.id} did not land: ${NO_ROW}`)
  }

  return result
}
