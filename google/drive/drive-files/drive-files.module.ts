import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const driveFiles = {
  id: "01a05bec-fc0c-717a-b732-43f42f2c02fb",
  pageTypeSlug: "module",
  slug: "drive-files",
  definition: "a Drive file found by id or by URL, and its bytes fetched",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A URL's `id` query parameter is read before the id its path carries.",
    },
    {
      invariantKind: "departure",
      statement: "A document Google itself holds is told apart by the prefix of its mime type.",
    },
    {
      invariantKind: "departure",
      statement: "A body Drive answers that is not binary is refused.",
    },
  ],
} as const satisfies Module
