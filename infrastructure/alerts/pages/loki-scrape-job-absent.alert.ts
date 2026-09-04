import type { Alert } from "../alert.page-type.ts"

export const lokiScrapeJobAbsent = {
  id: "01a06755-62fa-70b8-8b67-12316c66ad5c",
  pageTypeSlug: "alert",
  slug: "loki-scrape-job-absent",
  title: "Loki scrape job absent",
  definition: "Prometheus has no Loki job to scrape",
  domain: "infrastructure",
  summary: "The loki scrape job has no targets — Loki is unmonitored again",
  description: "txt",
} as const satisfies Alert
