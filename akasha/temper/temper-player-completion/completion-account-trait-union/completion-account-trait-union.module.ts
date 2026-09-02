import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionAccountTraitUnion = {
  id: "01a06358-4f7c-76c9-ae33-27a581dd7401",
  pageTypeSlug: "module",
  slug: "completion-account-trait-union",
  definition: "the item traits any one character of an account has researched, counted by line",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trait researched by one character counts as researched for the account.",
    },
    {
      invariantKind: "departure",
      statement: "The craft type catalog and the research line catalog arrive as arguments.",
    },
    {
      invariantKind: "departure",
      statement: "A trait is matched across characters by the craft and the line and the number.",
    },
    {
      invariantKind: "departure",
      statement: "A craft type is ordered by the game number.",
    },
    {
      invariantKind: "departure",
      statement: "A research line is ordered by the display order.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty list of character progress answers an empty progress.",
    },
  ],
} as const satisfies Module
