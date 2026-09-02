import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricValue } from "../metric-value/metric-value.module.code.ts"

export interface MetricChange {
  metric: MetricValue
  previousValue: number
  currentValue: number
  delta: number
  percentChange: number
  isIncrease: boolean
}

export function compareMetricValuesUnfiltered(
  previous: Partial<Record<MetricId, MetricValue>>,
  current: Partial<Record<MetricId, MetricValue>>
): readonly MetricChange[] {
  const changes: MetricChange[] = []
  const processedIds = new Set<MetricId>()

  for (const currentMetric of Object.values(current)) {
    processedIds.add(currentMetric.id)
    const previousMetric = previous[currentMetric.id]
    const previousValue = previousMetric?.value ?? 0
    const currentValue = currentMetric.value
    const delta = currentValue - previousValue

    if (delta === 0) {
      continue
    }

    const percentChange = previousValue !== 0 ? delta / previousValue : 1

    changes.push({
      metric: currentMetric,
      previousValue,
      currentValue,
      delta,
      percentChange,
      isIncrease: delta > 0,
    })
  }

  for (const previousMetric of Object.values(previous)) {
    if (processedIds.has(previousMetric.id)) {
      continue
    }

    const previousValue = previousMetric.value
    const currentValue = 0
    const delta = currentValue - previousValue

    if (delta === 0) {
      continue
    }

    const percentChange = previousValue !== 0 ? delta / previousValue : 1

    changes.push({
      metric: { ...previousMetric, value: currentValue },
      previousValue,
      currentValue,
      delta,
      percentChange,
      isIncrease: delta > 0,
    })
  }

  changes.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))

  return changes
}

export function filterByAffectedMetrics(
  changes: readonly MetricChange[],
  affectedMetricIds: Set<MetricId>
): readonly MetricChange[] {
  return changes.filter((change) => affectedMetricIds.has(change.metric.id))
}
