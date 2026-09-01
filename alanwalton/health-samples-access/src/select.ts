import { askComposed } from "@shared/pages-query/ask"
import { ROW_CEILING, recordOf } from "./rows"
import type { HealthMetric, HealthSampleRecord } from "./types"

export async function selectHealthSamples(args: {
  readonly metric: HealthMetric
  readonly from: string
  readonly to: string
}): Promise<readonly HealthSampleRecord[]> {
  const asked = await askComposed({
    "page-type": "health-sample",
    where: {
      metric: { is: args.metric },
      "started-at": { "at-or-after": args.from, before: args.to },
    },
    "sort-by": "started-at",
    descending: false,
    limit: ROW_CEILING,
  })
  if (!asked.ok) throw new Error(`selectHealthSamples: ${asked.why}`)

  const out: HealthSampleRecord[] = []
  for (const row of asked.answer.rows) {
    const held = recordOf(row.values)
    if (held !== null && held.metric === args.metric) out.push(held)
  }
  return out
}
