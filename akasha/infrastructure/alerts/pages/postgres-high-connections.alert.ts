import type { Alert } from "../alert.page-type.ts"

export const postgresHighConnections = {
  id: "01a06755-62fb-76c9-beb4-0890595ffdd3",
  pageTypeSlug: "alert",
  slug: "postgres-high-connections",
  title: "Postgres high connections",
  definition: "Postgres is holding close to as many connections as it allows",
  domain: "infrastructure",
  summary:
    "Postgres {{ $labels.server }} at {{ $value | humanizePercentage }} of its own max_connections",
  description: "txt",
} as const satisfies Alert
