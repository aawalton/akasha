import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSuggestionGenerator = {
  id: "01a06152-c2d6-7af6-bf3c-a6d3324e80f0",
  pageTypeSlug: "module",
  slug: "companion-suggestion-generator",
  definition: "ranked single-change suggestions that raise a companion build score",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A suggestion is emitted only when the changed build outscores the base build.",
    },
    {
      invariantKind: "constraint",
      statement: "At most ten suggestions are returned.",
    },
    {
      invariantKind: "departure",
      statement: "Legendary quality is offered only for the two ring slots.",
    },
  ],
} as const satisfies Module
