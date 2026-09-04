import type { Alert } from "../alert.page-type.ts"

export const postgresWalArchivingStale = {
  id: "01a06755-62fb-73f9-889d-2a01e736536f",
  pageTypeSlug: "alert",
  slug: "postgres-wal-archiving-stale",
  title: "Postgres WAL archiving stale",
  definition: "Postgres has not archived any write-ahead log for longer than is allowed",
  domain: "infrastructure",
  summary: "No successful WAL archive in {{ $value | humanizeDuration }}",
  description: "txt",
} as const satisfies Alert
