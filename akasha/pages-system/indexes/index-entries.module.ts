import type { Module } from "../../code-system/module/module.page-type.ts"

export const indexEntries = {
  id: "01a04b79-16c5-70d4-884a-66c95ddbec0d",
  pageTypeSlug: "module",
  slug: "index-entries",
  definition: "the entries a page's value implies",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's body can be loaded after the file it came from is gone.",
    },
  ],
} as const satisfies Module
