import type { Alert } from "../alert.page-type.ts"

export const k3sKineRangeLatencyHigh = {
  id: "01a06755-62fa-79b1-985f-1a93d19f552e",
  pageTypeSlug: "alert",
  slug: "k3s-kine-range-latency-high",
  title: "K3s kine range latency high",
  definition: "kine is taking a long time to answer the k3s apiserver's range reads",
  domain: "infrastructure",
  summary: "k3s kine range-query p99 > 500 ms (operation={{ $labels.operation }})",
  description: "txt",
} as const satisfies Alert
