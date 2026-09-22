import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const messageNaming = {
  id: "01a090ec-d6a6-7000-9e51-19347ddb64ce",
  type: "page-type/module",
  slug: "message-naming",
  definition: "the name a message page takes from the message's identity",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message page is named for the last twelve hex of the message's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An id is read for its hex alone, whether or not dashes part them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name opens with the message page type's slug.",
    },
  ],
} as const satisfies Module
