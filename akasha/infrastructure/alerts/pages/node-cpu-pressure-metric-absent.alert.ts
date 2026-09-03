import type { Alert } from "../alert.page-type.ts"

export const nodeCpuPressureMetricAbsent = {
  id: "01a06755-62fa-7401-aa72-ada88b0eea14",
  pageTypeSlug: "alert",
  slug: "node-cpu-pressure-metric-absent",
  title: "Node CPU pressure metric absent",
  definition: "nothing is reporting how long work on a node waits for CPU",
  domain: "infrastructure",
  summary: "Node PSI CPU series absent — scrape lost or metric dead",
  description: "txt",
} as const satisfies Alert
