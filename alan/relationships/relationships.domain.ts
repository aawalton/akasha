import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const relationships = {
  id: "01a0658f-90a6-7faf-883a-b68b1891fd70",
  type: "page-type/domain",
  slug: "relationships",
  definition: "Alan's relationships",
  parts: [
    "page-type/connection-activity",
    "page-type/relationship",
    "page-type/relationship-deposit",
    "page-type/relationship-topic",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A relationship is Alan's own record of somebody rather than somebody the system reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship names a person only where the system reaches that person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship's circle is Alan's own ladder rather than a rung of closeness.",
    },
  ],
} as const satisfies Domain
