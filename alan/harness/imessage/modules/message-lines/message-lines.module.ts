import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const messageLines = {
  id: "01a0657e-795c-7000-8a91-fdebae0f4233",
  type: "page-type/module",
  slug: "message-lines",
  definition: "how code writes the text of each iMessage message with its time and its sender",
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
  createdAt: "2026-09-03T04:19:42.556Z",
  updatedAt: "2026-10-30T15:33:01.262Z",
} as const satisfies Module
