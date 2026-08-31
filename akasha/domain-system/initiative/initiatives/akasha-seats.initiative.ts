import type { Initiative } from "../initiative.page-type.ts"

export const akashaSeats = {
  id: "01a05324-954d-7779-94a2-b303b61ad2f5",
  pageTypeSlug: "initiative",
  slug: "akasha-seats",
  domainSlug: "workspace-package/seat-system",
  personaSlug: "akasha",
  parentSlug: "akasha-migration",
  intents: [
    { statement: "Nothing outside akasha says what a seat is." },
    { statement: "A seat at work keeps working while its page moves." },
  ],
} as const satisfies Initiative
