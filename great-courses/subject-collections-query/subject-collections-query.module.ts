import type { Module } from "../../code-system/modules/module.page-type.ts"

export const subjectCollectionsQuery = {
  id: "01a06579-f3d9-7004-86eb-78bec98c84f4",
  pageTypeSlug: "module",
  slug: "subject-collections-query",
  definition: "the `great-courses-subject` shelves the store holds, indexed by title",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row holding no title or no slug is left out of the index.",
    },
  ],
} as const satisfies Module
