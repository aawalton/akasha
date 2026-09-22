import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalPageTypeChange = {
  id: "01a09c6e-7c73-7c16-9054-f8d3b748d48c",
  type: "page-type/domain",
  slug: "change-mechanical-page-type-change",
  definition: "a mechanical change stating a property of a page type anew",
  parts: [
    "change-mechanical-page-type/change-calculation-held-type",
    "change-mechanical-page-type/change-property-on-page-type",
    "change-mechanical-page-type/qualify-relation-on-every-page",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung here answers for every page of the page type at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung here writes the declaration, the pages under it, or both.",
    },
  ],
} as const satisfies Domain
