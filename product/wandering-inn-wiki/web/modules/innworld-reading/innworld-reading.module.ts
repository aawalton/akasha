import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const innworldReading = {
  id: "01a0c61a-8975-7295-9bd9-dd7c9e8d99c7",
  type: "page-type/module",
  slug: "innworld-reading",
  definition: "the collections this wiki names in its sidebar",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection is one page type the reader of this site reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a reader may reach is the read itself rather than a list kept here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection is named by the plural its page type states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type stating no plural is named by its own slug.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The page type collection is akasha's own record, and is named nowhere here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
