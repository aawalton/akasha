import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeMechanicalPageTypeChange = {
  id: "01a09c6e-7c73-7c16-9054-f8d3b748d48c",
  type: "domain",
  slug: "change-mechanical-page-type-change",
  definition: "a mechanical change stating a page type's declaration of one property anew",
  parts: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here answers for every page of the page type at once.",
    },
    {
      invariantKind: "departure",
      statement: "A rung here states the declaration anew beside the pages under it.",
    },
  ],
} as const satisfies Domain
