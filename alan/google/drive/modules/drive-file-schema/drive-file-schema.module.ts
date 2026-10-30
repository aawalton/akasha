import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const driveFileSchema = {
  id: "01a05bec-fc0b-71e6-99a6-f877a44350dd",
  type: "page-type/module",
  slug: "drive-file-schema",
  definition: "the shape of what Google Drive sends about a file",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field Drive sends that is not asked for is kept rather than dropped.",
    },
  ],
  createdAt: "2026-09-01T07:44:12.811Z",
  updatedAt: "2026-10-30T15:06:59.056Z",
} as const satisfies Module
