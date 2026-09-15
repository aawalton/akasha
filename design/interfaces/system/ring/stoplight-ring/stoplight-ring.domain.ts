import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const stoplightRing = {
  id: "01a0655b-9cdd-7e6b-ab7d-6c730604d9f4",
  type: "domain",
  slug: "stoplight-ring",
  definition: "a stoplight drawn with its reading inside and its progress around",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subject with no reading is black.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading below black or above blue keeps its stroke.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading between two rungs draws an arc.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stroke has the current tier's color and the arc the next one's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The arc is how far along a reading is toward its next rung rather than on the whole scale.",
    },
  ],
} as const satisfies Domain
