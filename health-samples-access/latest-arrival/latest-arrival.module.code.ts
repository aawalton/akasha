import { existsSync, readFileSync } from "node:fs"
import { instantMs } from "../sample-identity/sample-identity.module.code.ts"
import { recordOf } from "../sample-rows/sample-rows.module.code.ts"
import { checkoutRoot, sampleRowsAt } from "../sample-selecting/sample-selecting.module.code.ts"
import type { HealthMetric } from "../sample-shape/sample-shape.module.code.ts"

const DAY_MS = 86400000

export function selectLatestArrivalAt(args: {
  readonly metric: HealthMetric
  readonly startedSince: string
  readonly root?: string
}): string | null {
  const root = args.root ?? checkoutRoot()
  const from = instantMs(args.startedSince) - DAY_MS
  const to = Date.now() + DAY_MS
  let latest: string | null = null
  for (let at = from; at <= to; at += DAY_MS) {
    const path = sampleRowsAt(root, new Date(at).toISOString().slice(0, 10))
    if (!existsSync(path)) continue
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const text = line.trim()
      if (text === "") continue
      let values: unknown
      try {
        values = JSON.parse(text)
      } catch {
        throw new Error(`selectLatestArrivalAt: ${path} carries a line that is not JSON`)
      }
      const held = recordOf(values as Readonly<Record<string, unknown>>)
      if (held === null || held.metric !== args.metric) continue
      if (held.arrivedAt === "") continue
      if (latest === null || held.arrivedAt > latest) latest = held.arrivedAt
    }
  }
  return latest
}
