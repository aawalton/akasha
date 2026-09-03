import type { Alert } from "../alert.page-type.ts"

export const lokiIngesterStreamsHigh = {
  id: "01a06755-62fa-714e-a2d1-da3d32e6cde9",
  pageTypeSlug: "alert",
  slug: "loki-ingester-streams-high",
  title: "Loki ingester streams high",
  definition: "a Loki ingester is holding close to as many streams as it can",
  domain: "infrastructure",
  summary:
    "'Loki ingester holds {{ $value | printf \"%.0f\" }} in-memory streams (tenant {{ $labels.tenant }})'",
  description: "txt",
} as const satisfies Alert
