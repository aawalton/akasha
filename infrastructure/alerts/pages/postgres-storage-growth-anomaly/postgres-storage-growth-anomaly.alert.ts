import type { Alert } from "../../alert.page-type.types.ts"

export const postgresStorageGrowthAnomaly = {
  id: "01a06755-62fb-7e54-93df-01d88f7d9d33",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "postgres-storage-growth-anomaly",
  title: "Postgres storage growth anomaly",
  definition: "Postgres is growing on disk faster than it usually does",
  domain: "infrastructure",
  summary: "Postgres storage growth rate is abnormally high ({{ $value | humanize }}B/s vs normal)",
  runbook: "txt",
} as const satisfies Alert
