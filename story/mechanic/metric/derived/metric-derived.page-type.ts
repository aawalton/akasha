import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricDerived = {
  id: "01a0ca2c-3188-73cb-9621-2122beb52818",
  type: "page-type/page-type",
  slug: "metric-derived",
  definition: "a number worked out from a character's other metrics",
  pluralSlug: "derived",
  extends: ["page-type/metric"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
