import type { LocationTraceInsert } from "../trace-shape/trace-shape.module.code.ts"

// NOTHING HAS EVER KEPT A LOCATION TRACE. Not one point has been filed, in any store, ever.
// `public.location_traces`, the dedicated table this was designed around, took zero inserts
// across the whole ninety days it existed, while `health_samples` took 819,479 on that same
// counter. No `.location-traces.jsonl` has ever been committed. And no Atlas iOS build has ever
// been recorded, so nothing has ever posted a batch to `POST /api/locations/ingest` either.
// This is a feature that never finished, rather than data written and then orphaned.
//
// DO NOT REBUILD THIS ON THE PAGES TIER. Alan settled the storage in July and settled it against
// exactly this: a dedicated table for GPS traces, and explicitly not the pages tier. Repointing
// the writer onto the page store dropped that call without restating it. The whole-file put under
// `akasha/` would make a write land here, and landing is not the same as being right. The finding
// `nothing-has-ever-kept-a-location-trace` holds the evidence and the call taken.
//
// THE REFUSAL IS LOAD-BEARING, SO LEAVE IT A REFUSAL. The phone acknowledges a batch only where
// the answer is 200 and its body parses, and its buffer has no ceiling, so a throw here leaves
// every point held on the device. Answering `{ inserted: 0 }` under a 200 would read back as
// filed, and the phone would drop the batch for good.
const NOTHING_KEPT =
  "nothing has ever kept a location trace, and where one belongs is settled on its finding"

export async function insertLocationTraces(
  records: readonly LocationTraceInsert[]
): Promise<{ inserted: number }> {
  if (records.length === 0) return { inserted: 0 }
  throw new Error(
    `insertLocationTraces: ${records.length} location trace(s) went unkept — ${NOTHING_KEPT}`
  )
}
