import type { Alert } from "../../alert.page-type.types.ts"

export const postgresDown = {
  id: "01a06755-62fb-7183-ac82-e937b1aa44d7",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "postgres-down",
  title: "Postgres down",
  definition: "Postgres is not answering",
  domain: "infrastructure",
  summary: "Postgres exporter reports database is down",
  runbook: "txt",
} as const satisfies Alert
