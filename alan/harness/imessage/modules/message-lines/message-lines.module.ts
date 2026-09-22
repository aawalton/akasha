import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const messageLines = {
  id: "01a0657e-795c-7000-8a91-fdebae0f4233",
  type: "page-type/module",
  slug: "message-lines",
  definition: "the pieces an iMessage row is written out from: its moment, its sender, its body",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A handle no contact names is written as the handle itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message with neither a handle nor a chat is labelled unknown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line break inside a message body becomes one carriage glyph.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A moment is written in the reader's own timezone rather than in UTC.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The contact naming this module takes is the shape of the contacts store rather than that module.",
    },
  ],
} as const satisfies Module
