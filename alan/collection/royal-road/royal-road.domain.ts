import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const royalRoad = {
  id: "01a0657f-4492-7000-a3fc-56efd626beaa",
  type: "page-type/domain",
  slug: "royal-road",
  definition: "a page for each story on Royal Road",
  parts: [
    "domain/royal-road-site",
    "module/royal-road-pages",
    "module/royal-road-syncing",
    "service-workstation/royal-road-sync",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page written from Royal Road is written by the syncing module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reach out to Royal Road goes through this package.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is fetched without the account.",
    },
  ],
} as const satisfies Domain
