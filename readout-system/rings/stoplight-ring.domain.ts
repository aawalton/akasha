import type { Domain } from "@akasha/domains/domain"

export const stoplightRing = {
  id: "01a0655b-9cdd-7e6b-ab7d-6c730604d9f4",
  pageTypeSlug: "domain",
  slug: "stoplight-ring",
  definition: "a stoplight drawn with its reading inside and its progress around",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subject with no reading is black.",
    },
    {
      invariantKind: "departure",
      statement: "A reading below black or above blue keeps its stroke.",
    },
    {
      invariantKind: "departure",
      statement: "A reading between two rungs draws an arc.",
    },
    {
      invariantKind: "departure",
      statement: "The stroke carries the current tier's color and the arc the next one's.",
    },
    {
      invariantKind: "departure",
      statement:
        "The arc is how far a reading stands toward its next rung rather than on the whole scale.",
    },
  ],
} as const satisfies Domain
