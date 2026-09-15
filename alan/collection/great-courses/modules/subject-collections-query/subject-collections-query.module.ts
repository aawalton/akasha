import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subjectCollectionsQuery = {
  id: "01a06579-f3d9-7004-86eb-78bec98c84f4",
  type: "page-type/module",
  slug: "subject-collections-query",
  definition: "the `great-courses-subject` shelves the store has, indexed by title",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row holding no title or no slug is left out of the index.",
    },
  ],
} as const satisfies Module
