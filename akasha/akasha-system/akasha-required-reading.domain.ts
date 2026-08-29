import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaRequiredReading = {
  id: "01a04d97-c600-78b8-b3eb-faf390b009ce",
  pageTypeSlug: "domain",
  slug: "akasha-required-reading",
  definition: "the reading an agent cannot skip",
  intent: [
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
      statement: "An act is refused until its required reading is read.",
    },
    {
      invariantKind: "gap",
      statement: "Only a read the akasha system runs counts as read.",
    },
    {
      invariantKind: "gap",
      statement: "A read stops counting when what was read changes.",
    },
    {
      invariantKind: "gap",
      statement: "A refusal names the reading it wants and the route that records it.",
    },
  ],
} as const satisfies Domain
