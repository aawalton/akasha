import type { Alert } from "../../alert.page-type.types.ts"

export const lokiPushLatencyHigh = {
  id: "01a06755-62fa-7ae7-bdf6-d55591a04cae",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "loki-push-latency-high",
  title: "Loki push latency high",
  definition: "Loki is taking a long time to accept the logs pushed to it",
  domain: "infrastructure",
  summary: "'Loki push p99 latency is {{ $value | printf \"%.2f\" }}s'",
  runbook: "txt",
} as const satisfies Alert
