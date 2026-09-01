import type { LocationTraceInsert } from "../trace-shape/trace-shape.module.code.ts"

// NOTHING HAS KEPT A LOCATION TRACE SINCE THE STORE STOPPED TAKING KEYED WRITES. Every trace
// arrived here through `POST /api/locations/ingest`, which the phone's capture loop calls while
// Alan moves, and both landing statements were keyed writes: the day anchor went in with
// `writePage` and the traces themselves with `writeRows`. The store refuses both unconditionally,
// so each batch threw and the route answered 500.
//
// The two reads that stood above the writes worked — one asked which traces the day already held
// so a repeat would not be filed twice, the other asked whether the day was paged yet. Both are
// gone with the writes they served: reading what a batch would have deduplicated against is only
// worth its round trips if something can then file the rest.
//
// This refuses rather than returning `{ inserted: 0 }`, because a zero here would read as "the
// phone sent nothing new" to a route that reports `inserted` straight back to the phone, and the
// truth is that every point in the batch was dropped. A day of movement absent from the map is a
// false statement about where Alan was.
//
// What a restoration wants is a body, not keys: the rows are already shaped by `rowValuesOf` in
// `../trace-rows/trace-rows.module.code.ts`, and it is the writing side that needs somewhere to
// land them.
const NO_KEYED_WRITE =
  "the page store refuses every keyed write, so a trace cannot be filed against its day"

export async function insertLocationTraces(
  records: readonly LocationTraceInsert[]
): Promise<{ inserted: number }> {
  if (records.length === 0) return { inserted: 0 }
  throw new Error(
    `insertLocationTraces: ${records.length} location trace(s) went unkept — ${NO_KEYED_WRITE}`
  )
}
