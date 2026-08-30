import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaRequiredReading = {
  id: "01a04d97-c600-78b8-b3eb-faf390b009ce",
  pageTypeSlug: "domain",
  slug: "akasha-required-reading",
  definition: "the reading an agent cannot skip",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An act is refused until its required reading is read.",
    },
    {
      invariantKind: "departure",
      statement: "Only a read the akasha system runs counts as read.",
    },
    {
      invariantKind: "departure",
      statement: "A body counts as read by whoever landed it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read stops counting when what was read changes unless a mechanical change carried it forward.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the reading it wants and the route that records it.",
    },
  ],
} as const satisfies Domain
