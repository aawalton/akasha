import type { RatingSurplusInfo } from "@akasha/temper-formula-framework/rating-chance"
import type { SourceCategoryId } from "@akasha/temper-formula-framework/source-category"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionMetricTemplate } from "../companion-metric-template/companion-metric-template.module.code.ts"
import { COMPANION_METRICS_00 } from "../companion-metrics-00/companion-metrics-00.module.code.ts"
import { COMPANION_METRICS_01 } from "../companion-metrics-01/companion-metrics-01.module.code.ts"
import { COMPANION_METRICS_02 } from "../companion-metrics-02/companion-metrics-02.module.code.ts"

export const COMPANION_CATEGORIES: SourceCategoryId[] = [
  "companion-base",
  "companion-armor",
  "companion-weapons",
  "companion-jewelry",
  "companion-skills",
]

const COMPANION_METRICS_DATA: Record<CompanionMetricId, CompanionMetricTemplate> = {
  ...COMPANION_METRICS_00,
  ...COMPANION_METRICS_01,
  ...COMPANION_METRICS_02,
}

export const companionMetrics = createDataFile<CompanionMetricTemplate>()(COMPANION_METRICS_DATA)

type CompanionMetric = CompanionMetricTemplate & { id: CompanionMetricId }

export type CompanionMetricValue = CompanionMetric & { value: number; surplus?: RatingSurplusInfo }

export function getCompanionMetricName(metricId: CompanionMetricId): string {
  return COMPANION_METRICS_DATA[metricId].name
}
