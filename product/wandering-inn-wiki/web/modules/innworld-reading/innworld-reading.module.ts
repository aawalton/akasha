import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const innworldReading = {
  id: "01a0c61a-8975-7295-9bd9-dd7c9e8d99c7",
  type: "page-type/module",
  slug: "innworld-reading",
  definition: "the page types this wiki names in its sidebar",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is named here only where the reader of this site reaches it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a reader may reach is the read itself rather than a list kept here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is named by the plural that page type states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type stating no plural is named by its own slug.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Akasha's own records of page types and of views are left out here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
