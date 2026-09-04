import type { Domain } from "../../domains/domain.page-type.ts"

export const relating = {
  id: "01a0658f-90a6-7faf-883a-b68b1891fd70",
  pageTypeSlug: "domain",
  slug: "relating",
  definition: "the people in Alan's life and what he keeps of them",
  partSlugs: [
    "page-type/connection-activity",
    "page-type/relationship",
    "page-type/relationship-deposit",
    "page-type/relationship-topic",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A relationship is Alan's own record of somebody rather than somebody the system reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A relationship names a person only where the system reaches that person.",
    },
    {
      invariantKind: "departure",
      statement: "A relationship's circle is Alan's own ladder rather than a rung of closeness.",
    },
  ],
} as const satisfies Domain
