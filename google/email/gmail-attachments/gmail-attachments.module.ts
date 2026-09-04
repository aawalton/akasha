import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const gmailAttachments = {
  id: "01a05c0e-3730-7187-8180-c05ac035233c",
  pageTypeSlug: "module",
  slug: "gmail-attachments",
  definition: "the files hanging off a mail message, listed, fetched and made",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A part is an attachment only where it carries both a filename and an id.",
    },
    {
      invariantKind: "departure",
      statement: "Nested parts are walked to the bottom.",
    },
    {
      invariantKind: "departure",
      statement: "A part naming no type is treated as a stream of bytes.",
    },
  ],
} as const satisfies Module
