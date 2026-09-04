import type { Alert } from "../alert.page-type.ts"

export const postgresWalArchivingFailing = {
  id: "01a06755-62fb-73ec-a1ab-c77b37446884",
  pageTypeSlug: "alert",
  slug: "postgres-wal-archiving-failing",
  title: "Postgres WAL archiving failing",
  definition: "Postgres is failing to archive its write-ahead log",
  domain: "infrastructure",
  summary: "Postgres WAL archiving is failing ({{ $value }} failures in 15m)",
  description: "txt",
} as const satisfies Alert
