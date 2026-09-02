import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCardRegistry = {
  id: "01a06103-0619-70b6-a023-3ddab1c8dcb3",
  pageTypeSlug: "module",
  slug: "completion-card-registry",
  definition: "every completion card with the tab and the title the category tree gives it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A card identifier is a literal type read off the category tree.",
    },
  ],
} as const satisfies Module
