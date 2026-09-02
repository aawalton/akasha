import type { Metric } from "../metrics/metrics.module.code.ts"

export type MetricValue = Metric & {
  value: number
}
