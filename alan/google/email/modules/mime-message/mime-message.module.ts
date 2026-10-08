import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mimeMessage = {
  id: "01a05c0e-372f-78d8-908e-3f8b94dc0ac5",
  type: "page-type/module",
  slug: "mime-message",
  definition: "an email written out as the bytes a mail server takes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A header with anything outside printable ASCII is encoded as base64 UTF-8.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Attachment bytes are wrapped at 76 characters to the line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A filename outside ASCII is given as an RFC 2231 parameter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message with no attachment is one plain-text part rather than multipart.",
    },
  ],
  createdAt: "2026-09-01T08:20:30.639Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Module
