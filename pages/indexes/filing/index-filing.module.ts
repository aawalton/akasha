import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const indexFiling = {
  id: "01a08e9f-f494-79ea-9155-8f6f56dbf41c",
  pageTypeSlug: "module",
  type: "module",
  slug: "index-filing",
  definition: "the index lines a test files into a root of its own",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where a line is filed is worked out here rather than beside a module.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a line back.",
    },
  ],
} as const satisfies Module
