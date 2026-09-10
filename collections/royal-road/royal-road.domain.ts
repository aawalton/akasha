import type { Domain } from "../../domains/domain.page-type.types.ts"

export const royalRoad = {
  id: "01a0657f-4492-7000-a3fc-56efd626beaa",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "royal-road",
  definition: "the pages Royal Road serves, read into fictions and chapters",
  parts: [
    "module/royal-road-pages",
    "module/royal-road-syncing",
    "workstation-service/royal-road-sync",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page written from Royal Road is written by the syncing module.",
    },
    {
      invariantKind: "departure",
      statement: "Every reach out to Royal Road goes through this package.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is fetched without the account.",
    },
  ],
} as const satisfies Domain
