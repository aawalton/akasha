import type { Module } from "../../../code-system/module/module.page-type.ts"

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
    {
      invariantKind: "departure",
      statement: "A page claims its own path and the file each of its file properties names.",
    },
    {
      invariantKind: "departure",
      statement: "A page claims the sops file standing beside it whatever it carries.",
    },
    {
      invariantKind: "departure",
      statement: "The naming grammar lets no other page claim that file.",
    },
  ],
} as const satisfies Module
