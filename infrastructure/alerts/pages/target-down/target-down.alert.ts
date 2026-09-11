import type { Alert } from "akasha/infrastructure/alerts/alert.page-type.types.ts"

export const targetDown = {
  id: "01a06755-62fb-7224-9bc4-151ce311e259",
  type: "alert",
  slug: "target-down",
  title: "Target down",
  definition: "Prometheus cannot scrape a target it is configured to reach",
  domain: "infrastructure",
  summary: "Scrape target {{ $labels.job }} / {{ $labels.instance }} is down",
  runbook: "txt",
} as const satisfies Alert
