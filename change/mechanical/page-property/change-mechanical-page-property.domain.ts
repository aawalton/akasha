import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalPageProperty = {
  id: "01a09c4d-191b-725f-98c4-86303f4147e9",
  type: "domain",
  slug: "change-mechanical-page-property",
  definition: "a mechanical change acting on a page property and on every page with it",
  parts: [
    "change-mechanical/add-page-property",
    "change-mechanical/remove-page-property",
    "change-mechanical/rename-page-property-property-slug",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rung here answers the whole scope of one act in one call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rung here reads the pages carrying the property from the index once.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rung here reaches a rung beneath once for each page.",
    },
  ],
} as const satisfies Domain
