import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const buildRow = {
  id: "01a08e40-dcf5-7caf-be8f-9ac9935fa409",
  pageTypeSlug: "module",
  type: "module",
  slug: "build-row",
  definition: "the stored row a saved build is, read into the shape a caller holds it in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A row carries the metadata its own caller parses rather than a metadata of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A field that does not parse takes the empty value its type has.",
    },
  ],
} as const satisfies Module
