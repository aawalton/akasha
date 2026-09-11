import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const messageNaming = {
  id: "01a090ec-d6a6-7000-9e51-19347ddb64ce",
  type: "module",
  slug: "message-naming",
  definition: "the name a message page takes from the message's identity",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message page is named for the last twelve hex of the message's id.",
    },
    {
      invariantKind: "departure",
      statement: "An id is read for its hex alone, whether or not dashes part them.",
    },
    {
      invariantKind: "departure",
      statement: "A name opens with the message page type's slug.",
    },
  ],
} as const satisfies Module
