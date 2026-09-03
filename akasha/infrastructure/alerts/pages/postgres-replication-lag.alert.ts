import type { Alert } from "../alert.page-type.ts"

export const postgresReplicationLag = {
  id: "01a06755-62fb-73a2-a2fb-eea6379bcf60",
  pageTypeSlug: "alert",
  slug: "postgres-replication-lag",
  title: "Postgres replication lag",
  definition: "a Postgres replica has fallen behind its primary",
  domain: "infrastructure",
  summary: "Postgres replica {{ $labels.application_name }} lagging > 5m",
  description: "txt",
} as const satisfies Alert
