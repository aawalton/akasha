import { askComposed } from "@shared/pages-query/ask"
import { ROW_CEILING, textAt } from "./rows"
import type { HealthMetric } from "./types"

export async function selectLatestArrivalAt(args: {
  readonly metric: HealthMetric
  readonly startedSince: string
}): Promise<string | null> {
  const asked = await askComposed({
    "page-type": "health-sample",
    where: {
      metric: { is: args.metric },
      "started-at": { "at-or-after": args.startedSince },
    },
    limit: ROW_CEILING,
  })
  if (!asked.ok) throw new Error(`selectLatestArrivalAt: ${asked.why}`)

  let latest: string | null = null
  for (const row of asked.answer.rows) {
    if (textAt(row.values, "metric") !== args.metric) continue
    const arrived = textAt(row.values, "arrived-at")
    if (arrived === "") continue
    if (latest === null || arrived > latest) latest = arrived
  }
  return latest
}
