import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const driveFiles = {
  id: "01a05bec-fc0c-717a-b732-43f42f2c02fb",
  type: "page-type/module",
  slug: "drive-files",
  definition: "how code reads a file from Google Drive",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A URL's `id` query parameter is read before the id its path has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A document Google itself has is told apart by the prefix of its mime type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body Drive answers that is not binary is refused.",
    },
  ],
  createdAt: "2026-09-01T07:44:12.812Z",
  updatedAt: "2026-10-30T15:07:24.921Z",
} as const satisfies Module
