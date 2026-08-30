import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaSeatReading = {
  id: "01a05012-41a2-7001-b02c-83c7560a9c1a",
  pageTypeSlug: "domain",
  slug: "akasha-seat-reading",
  definition: "the reading a seat cannot skip",
  invariants: [
    {
      invariantKind: "gap",
      statement: "What a seat must read is worked out from what it is and what it has in hand.",
    },
    {
      invariantKind: "gap",
      statement: "No reading an agent needs falls outside the warrants.",
    },
    {
      invariantKind: "gap",
      statement: "A subagent owes what its seat owes, narrowed to what it was sent to do.",
    },
  ],
} as const satisfies Domain
