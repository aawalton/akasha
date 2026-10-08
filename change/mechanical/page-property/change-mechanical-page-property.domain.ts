import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalPageProperty = {
  id: "01a09c4d-191b-725f-98c4-86303f4147e9",
  type: "page-type/domain",
  slug: "change-mechanical-page-property",
  definition: "a mechanical change to every page with a property",
  parts: [
    "change-mechanical/add-page-property",
    "change-mechanical/remove-page-property",
    "change-mechanical/rename-page-property-property-slug",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung here answers the whole scope of one act in one call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung here reads the pages carrying the property from the index once.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung here reaches a rung beneath once for each page.",
    },
  ],
  createdAt: "2026-09-13T19:44:53.531Z",
  updatedAt: "2026-09-25T13:49:35.000Z",
} as const satisfies Domain
