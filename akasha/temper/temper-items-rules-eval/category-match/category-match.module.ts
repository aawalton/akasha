import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const categoryMatch = {
  id: "01a06137-f962-7e16-b493-859ad858c122",
  pageTypeSlug: "module",
  slug: "category-match",
  definition:
    "the answer to whether a compiled rule's category id appears in one item's category chain",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An absent category chain answers unknown rather than answering mismatch.",
    },
    {
      invariantKind: "departure",
      statement:
        "A match is plain equality between the rule category id and one node id in the chain.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here consults the category tree.",
    },
  ],
} as const satisfies Module
