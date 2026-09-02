import type { Finding } from "../finding.page-type.ts"

export const theMetricsTableOrderAndMetricIdsDisagree = {
  id: "01a06137-4dbe-7d44-9a5b-9419150a468e",
  pageTypeSlug: "finding",
  slug: "the-metrics-table-order-and-metric-ids-disagree",
  domainSlug: "domain/temper",
  claim:
    "METRIC_IDS in temper-formula-framework and the gathered metrics table hold the same 282 ids in two different orders, differing at 34 of 282 places. Nothing keeps the two equal and no check compares them. Neither order is a wire format today, so this is a trap rather than a live fault.",
  evidence:
    "Measured 2026-09-02 while landing akasha/temper/temper-characters-stats.\n\nakasha/temper/temper-formula-framework/metric-id/metric-id.module.code.ts holds METRIC_IDS as 282 entries sorted by the id. The metrics table gathers its entries in the order the four source partitions named them, and those partitions were written out in filename order rather than in id order. The first divergence is at index 52: the table gives damage-shield-cost then damage-shield, METRIC_IDS gives damage-shield then damage-shield-cost, because damage-shield-cost-metric.ts sorts before damage-shield-metric.ts as a filename. 34 positions differ. Set equality holds exactly, with no id on one side missing from the other and no duplicate on either.\n\nThe order matters because akasha/utils-narrow/create-data-file/create-data-file.module.code.ts:25 derives `ids` from Object.values(data), so the object literal key order is the order the table answers.\n\nWhy no fault today: temper/game-codec/src/character/build-codec-indices.ts imports nothing from this package, so neither order reaches a build hash. Every consumer found reads the table by key rather than by index, at metrics.has and metrics.data[...] in buff-or-debuff-explainer, diff-effect-sources, format-effects, metric-display-formula, metric-formulas and metric-calculator. METRIC_IDS itself is read only at line 286 of its own module to derive the MetricId union type.\n\nThe recreation preserved the table's existing order exactly rather than re-sorting to match METRIC_IDS, proved by comparing both orders index for index and by comparing whole structures with JSON.stringify. Re-sorting would have been the larger and less reversible call.",
} as const satisfies Finding
