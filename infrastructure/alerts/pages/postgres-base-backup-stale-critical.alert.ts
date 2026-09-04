import type { Alert } from "../alert.page-type.ts"

export const postgresBaseBackupStaleCritical = {
  id: "01a06755-62fa-7c46-8ae6-10e64dbf4ae3",
  pageTypeSlug: "alert",
  slug: "postgres-base-backup-stale-critical",
  title: "Postgres base backup stale critical",
  definition:
    "no Postgres base backup has completed for long enough that a restore would lose a great deal",
  domain: "infrastructure",
  summary:
    "Newest Postgres base backup is {{ $value | humanizeDuration }} old (>50h — two+ missed dailies)",
  description: "txt",
} as const satisfies Alert
