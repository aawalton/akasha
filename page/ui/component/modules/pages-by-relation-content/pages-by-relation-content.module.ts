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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A listing draws a tab for each view the page type has, and none where it has none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The view shown is named in the address, and the first view is shown where none is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A listing drawn for another view is drawn afresh, so it keeps no sort of the last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which view a listing last showed is remembered under the page type it lists.",
    },
  ],
} as const satisfies Module
