import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCollectiblesProgress = {
  id: "01a06358-4f7c-7028-886d-cc701f3aafab",
  pageTypeSlug: "module",
  slug: "completion-collectibles-progress",
  definition: "how many collectibles an account has unlocked, category by category",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collectible catalog arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "departure",
      statement:
        "A heading and the categories beneath the heading arrive together in one flat list.",
    },
    {
      invariantKind: "departure",
      statement: "A category naming no parent is a heading.",
    },
    {
      invariantKind: "departure",
      statement: "A category whose parent names no category in the list is a heading too.",
    },
    {
      invariantKind: "departure",
      statement:
        "A heading carrying collectibles directly gives a subheading named as the heading is.",
    },
    {
      invariantKind: "departure",
      statement: "A category stating no display order sorts at zero.",
    },
    {
      invariantKind: "departure",
      statement: "Categories sharing a display order keep the order of arrival.",
    },
    {
      invariantKind: "absence",
      statement: "No collectible category landed today states a display order.",
    },
    {
      invariantKind: "departure",
      statement: "A heading stating no category index is reckoned at index zero.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty catalog answers an empty progress.",
    },
  ],
} as const satisfies Module
