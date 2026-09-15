import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailAttachments = {
  id: "01a05c0e-3730-7187-8180-c05ac035233c",
  type: "module",
  slug: "gmail-attachments",
  definition: "the files hanging off a mail message, listed, fetched and made",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part is an attachment only where that part has both a filename and an id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nested parts are walked to the bottom.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part naming no type is treated as a stream of bytes.",
    },
  ],
} as const satisfies Module
