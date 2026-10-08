import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const stoplightRing = {
  id: "01a0655b-9cdd-7e6b-ab7d-6c730604d9f4",
  type: "page-type/domain",
  slug: "stoplight-ring",
  definition: "a ring that shows a stoplight",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A subject with no reading is black.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading below black or above blue keeps its stroke.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading between two rungs draws an arc.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stroke has the current tier's color and the arc the next one's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The arc is how far along a reading is toward its next rung rather than on the whole scale.",
    },
  ],
  createdAt: "2026-09-03T03:41:37.885Z",
  updatedAt: "2026-09-25T15:01:17.000Z",
} as const satisfies Domain
