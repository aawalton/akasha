import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const pagesByRelationContent = {
  id: "01a06259-518a-7c74-bd4f-519d9f6c1719",
  type: "module",
  slug: "pages-by-relation-content",
  definition: "a page type's pages, filtered and sorted, shown as a listing",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A listing whose filter went unasked says so in place of the pages.",
    },
  ],
} as const satisfies Module
