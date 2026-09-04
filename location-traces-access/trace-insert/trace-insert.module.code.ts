import type { LocationTraceInsert } from "../trace-shape/trace-shape.module.code.ts"

const NOTHING_KEPT =
  "nothing has ever kept a location trace, and the finding " +
  "nothing-has-ever-kept-a-location-trace holds where a trace belongs and why refusing is the " +
  "answer here: the phone acknowledges a batch only on a 200 whose body parses, and the phone's " +
  "buffer has no ceiling, so refusing keeps every point on the device, while a 200 carrying an " +
  "inserted count of zero would read back as filed and the phone would drop the batch for good"

export async function insertLocationTraces(
  records: readonly LocationTraceInsert[]
): Promise<{ inserted: number }> {
  if (records.length === 0) return { inserted: 0 }
  throw new Error(
    `insertLocationTraces: ${records.length} location trace(s) went unkept — ${NOTHING_KEPT}`
  )
}
