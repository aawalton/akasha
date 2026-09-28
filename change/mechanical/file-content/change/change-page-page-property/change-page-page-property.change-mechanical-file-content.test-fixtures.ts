export const BODY = `import type { PageType } from "../../page/type/page-type.page-type.ts"

export const kept = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  type: "page-type/page-type",
  slug: "kept",
  pluralSlug: "kepts",
  partSlugs: ["kept/one"],
} as const satisfies PageType
`

export const METRIC_BODY = `import type { Metric } from "../metric.page-type.ts"

export const health = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b05a",
  type: "page-type/metric",
  slug: "health",
  value: 10,
  shown: true,
} as const satisfies Metric
`
