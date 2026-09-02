import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionItemSetProgress = {
  id: "01a0632a-9d43-7b8b-9a8d-5a53b8bdb022",
  pageTypeSlug: "module",
  slug: "completion-item-set-progress",
  definition:
    "how many pieces of each item set an account holds, gathered under the set's category",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One fold adds the totals at every level.",
    },
    {
      invariantKind: "departure",
      statement: "A crafted set is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A set the add-on never saw counts as zero of zero pieces.",
    },
    {
      invariantKind: "departure",
      statement: "A category the add-on names wins over the category the set data gives.",
    },
    {
      invariantKind: "departure",
      statement: "A category holding more than one named root nests its subcategories under them.",
    },
  ],
} as const satisfies Module
