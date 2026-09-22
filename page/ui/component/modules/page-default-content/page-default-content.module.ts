import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageDefaultContent = {
  id: "01a0625a-e4ab-7093-bf90-0ac28e82dbd9",
  type: "page-type/module",
  slug: "page-default-content",
  definition: "the body a page is shown with when its page type names no other",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page inside an app that is not editing offers no way to change that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page drawn that way leaves out every section holding nothing.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A note is shown only where the reader may write it, for want of a reading view.",
    },
  ],
} as const satisfies Module
