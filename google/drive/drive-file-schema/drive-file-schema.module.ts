import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const driveFileSchema = {
  id: "01a05bec-fc0b-71e6-99a6-f877a44350dd",
  pageTypeSlug: "module",
  slug: "drive-file-schema",
  definition: "the shape Drive answers a file's metadata in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field Drive sends that is not asked for is kept rather than dropped.",
    },
  ],
} as const satisfies Module
