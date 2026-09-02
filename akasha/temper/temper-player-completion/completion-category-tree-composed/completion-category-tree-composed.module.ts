import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCategoryTreeComposed = {
  id: "01a06408-dd2e-7659-95d6-455a9c29e7ff",
  pageTypeSlug: "module",
  slug: "completion-category-tree-composed",
  definition: "the completion card tree with each achievement card's headings hung beneath it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The achievement headings arrive as an argument rather than as an imported table.",
    },
    {
      invariantKind: "departure",
      statement: "An achievement heading and its subheading are each named by their own title.",
    },
    {
      invariantKind: "departure",
      statement: "A card that is no achievement card crosses over unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "The companions tab holds no achievement card.",
    },
    {
      invariantKind: "departure",
      statement: "The companions tab is carried across whole.",
    },
    {
      invariantKind: "absence",
      statement: "Composing over the static tree leaves the static tree unchanged.",
    },
  ],
} as const satisfies Module
