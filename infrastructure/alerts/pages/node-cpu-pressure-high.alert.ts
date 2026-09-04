import type { Alert } from "../alert.page-type.ts"

export const nodeCpuPressureHigh = {
  id: "01a06755-62fa-701d-b94b-ae150b97de31",
  pageTypeSlug: "alert",
  slug: "node-cpu-pressure-high",
  title: "Node CPU pressure high",
  definition: "work on a node is spending a large share of its time waiting for CPU",
  domain: "infrastructure",
  summary:
    "Node {{ $labels.instance }} CPU pressure {{ $value | humanizePercentage }} — tasks stalled waiting on CPU",
  description: "txt",
} as const satisfies Alert
