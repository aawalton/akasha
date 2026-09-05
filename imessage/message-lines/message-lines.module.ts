import type { Module } from "../../code-system/modules/module.page-type.ts"

export const messageLines = {
  id: "01a0657e-795c-7000-8a91-fdebae0f4233",
  pageTypeSlug: "module",
  slug: "message-lines",
  definition: "a run of iMessage rows written out as tab-parted lines or as one JSON array",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Rows arrive newest first and are written oldest first.",
    },
    {
      invariantKind: "departure",
      statement: "A handle no contact names is written as the handle itself.",
    },
    {
      invariantKind: "departure",
      statement: "A message with neither a handle nor a chat is labelled unknown.",
    },
    {
      invariantKind: "departure",
      statement: "A line break inside a message body becomes one carriage glyph.",
    },
    {
      invariantKind: "departure",
      statement: "A moment is written in the reader's own timezone rather than in UTC.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The contact naming this module takes is the shape of the contacts store rather than that module.",
    },
  ],
} as const satisfies Module
