import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreBookPlanning = {
  id: "01a0d5e2-67da-71a2-b347-303c009487e9",
  type: "page-type/module",
  slug: "lore-book-planning",
  definition: "the lore collections and books the add-on and completion tables name, as pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A book both tables title alike in one collection is one page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title either table holds twice in one collection is merged with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book the add-on files under no collection is unfiled rather than guessed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug is the title's words, and a title two books share takes each book's key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection a page already has keeps that page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book slugged as its collection is is keyed apart from that collection.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or writes one.",
    },
  ],
} as const satisfies Module
