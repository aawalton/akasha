import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pagesByRelationContent = {
  id: "01a06259-518a-7c74-bd4f-519d9f6c1719",
  type: "page-type/module",
  slug: "pages-by-relation-content",
  definition: "a page type's pages, filtered and sorted, shown as a listing",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing whose filter went unasked says so in place of the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing inside an app that is not editing offers no way to change a page.",
    },
  ],
} as const satisfies Module
