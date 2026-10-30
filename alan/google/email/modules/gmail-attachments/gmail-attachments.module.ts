import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailAttachments = {
  id: "01a05c0e-3730-7187-8180-c05ac035233c",
  type: "page-type/module",
  slug: "gmail-attachments",
  definition: "how code handles the files an email carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A part is an attachment only where that part has both a filename and an id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nested parts are walked to the bottom.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part naming no type is treated as a stream of bytes.",
    },
  ],
  createdAt: "2026-09-01T08:20:30.640Z",
  updatedAt: "2026-10-30T15:11:38.615Z",
} as const satisfies Module
