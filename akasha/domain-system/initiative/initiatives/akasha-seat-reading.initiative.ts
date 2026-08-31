import type { Initiative } from "../initiative.page-type.ts"

export const akashaSeatReading = {
  id: "01a05324-954d-733a-a5d2-5404defb82b4",
  pageTypeSlug: "initiative",
  slug: "akasha-seat-reading",
  domainSlug: "domain/akasha-required-reading",
  personaSlug: "akasha",
  parentSlug: "akasha-migration",
  intents: [
    { statement: "What a seat must read is worked out from what it is and what it has in hand." },
    { statement: "No reading an agent needs falls outside the warrants." },
    { statement: "A subagent owes what its seat owes narrowed to what it was sent to do." },
  ],
} as const satisfies Initiative
