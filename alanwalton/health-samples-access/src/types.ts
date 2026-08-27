export type HealthMetric = "activeEnergy" | "stepCount"

export const HEALTH_METRIC_UNIT: Readonly<Record<HealthMetric, string>> = {
  activeEnergy: "kcal",
  stepCount: "count",
}

export const HEALTH_METRICS: readonly [HealthMetric, ...HealthMetric[]] = [
  "activeEnergy",
  "stepCount",
]

export interface HealthSample {
  readonly metric: HealthMetric
  readonly startedAt: string
  readonly endedAt: string
  readonly value: number
  readonly unit: string
  readonly sourceName: string
}

export interface HealthSampleRecord extends HealthSample {
  readonly id: string
  readonly arrivedAt: string
}

export interface HealthSampleWriteReport {
  readonly received: number
  readonly distinct: number
  readonly inserted: number
  readonly unchanged: number
  readonly valueChanged: number
}
