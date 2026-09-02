import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const mimeMessage = {
  id: "01a05c0e-372f-78d8-908e-3f8b94dc0ac5",
  pageTypeSlug: "module",
  slug: "mime-message",
  definition: "an email written out as the bytes a mail server takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A header holding anything outside printable ASCII is encoded as base64 UTF-8.",
    },
    {
      invariantKind: "departure",
      statement: "Attachment bytes are wrapped at 76 characters to the line.",
    },
    {
      invariantKind: "departure",
      statement: "A filename outside ASCII is given as an RFC 2231 parameter.",
    },
    {
      invariantKind: "departure",
      statement: "A message carrying no attachment is one plain-text part rather than multipart.",
    },
  ],
} as const satisfies Module
