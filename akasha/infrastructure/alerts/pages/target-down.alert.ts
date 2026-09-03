import type { Alert } from "../alert.page-type.ts"

export const targetDown = {
  id: "01a06755-62fb-7224-9bc4-151ce311e259",
  pageTypeSlug: "alert",
  slug: "target-down",
  title: "Target down",
  definition: "Prometheus cannot scrape a target it is configured to reach",
  domain: "infrastructure",
  summary: "Scrape target {{ $labels.job }} / {{ $labels.instance }} is down",
  description: "txt",
} as const satisfies Alert
