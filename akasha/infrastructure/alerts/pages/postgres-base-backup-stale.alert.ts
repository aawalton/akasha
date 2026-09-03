import type { Alert } from "../alert.page-type.ts"

export const postgresBaseBackupStale = {
  id: "01a06755-62fa-7f5f-9575-b8816c5392a8",
  pageTypeSlug: "alert",
  slug: "postgres-base-backup-stale",
  title: "Postgres base backup stale",
  definition: "no Postgres base backup has completed for longer than is allowed",
  domain: "infrastructure",
  summary: "Newest Postgres base backup is {{ $value | humanizeDuration }} old (>26h)",
  description: "txt",
} as const satisfies Alert
