import type { Initiative } from "../initiative.page-type.ts"

export const akashaSeats = {
  id: "01a05324-954d-7779-94a2-b303b61ad2f5",
  pageTypeSlug: "initiative",
  slug: "akasha-seats",
  domainSlug: "domain/seat-system",
  personaSlug: "akasha",
  parentSlug: "akasha-migration",
  invariants: [
    {
      invariantKind: "gap",
      statement: "A seat, its role and its persona are each a page in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing outside akasha says what a seat is.",
    },
    {
      invariantKind: "gap",
      statement: "A seat at work keeps working while its page moves.",
    },
  ],
} as const satisfies Initiative
