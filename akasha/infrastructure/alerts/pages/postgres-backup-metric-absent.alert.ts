import type { Alert } from "../alert.page-type.ts"

export const postgresBackupMetricAbsent = {
  id: "01a06755-62fa-76d4-be89-1a7b1e7ba042",
  pageTypeSlug: "alert",
  slug: "postgres-backup-metric-absent",
  title: "Postgres backup metric absent",
  definition: "nothing is reporting when Postgres was last backed up",
  domain: "infrastructure",
  summary: "Postgres backup-age gauge is absent — scrape lost or plugin metric dead",
  description: "txt",
} as const satisfies Alert
