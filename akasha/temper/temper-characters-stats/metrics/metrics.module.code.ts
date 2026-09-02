import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"
import { METRICS_DATA_01 } from "../metrics-data-01/metrics-data-01.module.code.ts"
import { METRICS_DATA_02 } from "../metrics-data-02/metrics-data-02.module.code.ts"
import { METRICS_DATA_03 } from "../metrics-data-03/metrics-data-03.module.code.ts"
import { METRICS_DATA_04 } from "../metrics-data-04/metrics-data-04.module.code.ts"
import { METRICS_DATA_05 } from "../metrics-data-05/metrics-data-05.module.code.ts"
import { METRICS_DATA_06 } from "../metrics-data-06/metrics-data-06.module.code.ts"
import { METRICS_DATA_07 } from "../metrics-data-07/metrics-data-07.module.code.ts"
import { METRICS_DATA_08 } from "../metrics-data-08/metrics-data-08.module.code.ts"
import { METRICS_DATA_09 } from "../metrics-data-09/metrics-data-09.module.code.ts"
import { METRICS_DATA_10 } from "../metrics-data-10/metrics-data-10.module.code.ts"
import { METRICS_DATA_11 } from "../metrics-data-11/metrics-data-11.module.code.ts"
import { METRICS_DATA_12 } from "../metrics-data-12/metrics-data-12.module.code.ts"
import { METRICS_DATA_13 } from "../metrics-data-13/metrics-data-13.module.code.ts"
import { METRICS_DATA_14 } from "../metrics-data-14/metrics-data-14.module.code.ts"
import { METRICS_DATA_15 } from "../metrics-data-15/metrics-data-15.module.code.ts"
import { METRICS_DATA_16 } from "../metrics-data-16/metrics-data-16.module.code.ts"

type MetricsRecord = Record<MetricId, MetricTemplate>
function asMetricsRecord(value: unknown): MetricsRecord {
  return value as MetricsRecord
}

const METRICS_DATA = asMetricsRecord({
  ...METRICS_DATA_01,
  ...METRICS_DATA_02,
  ...METRICS_DATA_03,
  ...METRICS_DATA_04,
  ...METRICS_DATA_05,
  ...METRICS_DATA_06,
  ...METRICS_DATA_07,
  ...METRICS_DATA_08,
  ...METRICS_DATA_09,
  ...METRICS_DATA_10,
  ...METRICS_DATA_11,
  ...METRICS_DATA_12,
  ...METRICS_DATA_13,
  ...METRICS_DATA_14,
  ...METRICS_DATA_15,
  ...METRICS_DATA_16,
})

const METRICS_DATA_WITH_FORMULAS = asMetricsRecord(
  Object.fromEntries(Object.entries(METRICS_DATA).filter(([, m]) => m.formula !== undefined))
)

export const metrics = createDataFile<MetricTemplate>()(METRICS_DATA)

const metricsWithFormulasDataFile = createDataFile<MetricTemplate>()(METRICS_DATA_WITH_FORMULAS)

export type Metric = MetricTemplate & { id: MetricId }

export type MetricWithFormula = Metric & {
  formula: NonNullable<MetricTemplate["formula"]>
}

export const metricsWithFormulas: readonly MetricWithFormula[] =
  metricsWithFormulasDataFile.list.filter(hasFormula)

export function getMetricDisplayName(metricId: MetricId): string {
  return metrics.data[metricId].name
}

export function hasFormula(
  metric: MetricTemplate
): metric is MetricTemplate & { formula: NonNullable<MetricTemplate["formula"]> } {
  return metric.formula !== undefined
}
