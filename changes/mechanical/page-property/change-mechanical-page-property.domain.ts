import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeMechanicalPageProperty = {
  id: "01a09c4d-191b-725f-98c4-86303f4147e9",
  type: "domain",
  slug: "change-mechanical-page-property",
  definition: "a mechanical change acting on a page property and on every page with it",
  parts: [
    "domain/change-mechanical-page-property-remove",
    "domain/change-mechanical-page-property-rename",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here answers the whole scope of one act in one call.",
    },
    {
      invariantKind: "departure",
      statement: "A rung here reads the pages carrying the property from the index once.",
    },
    {
      invariantKind: "absence",
      statement: "No rung here reaches a rung beneath once for each page.",
    },
  ],
} as const satisfies Domain
