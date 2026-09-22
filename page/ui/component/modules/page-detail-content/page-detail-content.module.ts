import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageDetailContent = {
  id: "01a0625a-e4ac-75a5-ad8c-dd0bb5c55a78",
  type: "page-type/module",
  slug: "page-detail-content",
  definition: "the body of one page, drawn by the component its page type names",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An app that is not editing writes nothing when a page is read, not even the view.",
    },
  ],
} as const satisfies Module
