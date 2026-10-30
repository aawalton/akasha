import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subjectCollectionsQuery = {
  id: "01a06579-f3d9-7004-86eb-78bec98c84f4",
  type: "page-type/module",
  slug: "subject-collections-query",
  definition: "how code finds the collection of each topic of The Great Courses",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row holding no title or no slug is left out of the index.",
    },
  ],
  createdAt: "2026-09-03T04:14:46.233Z",
  updatedAt: "2026-10-30T15:20:34.805Z",
} as const satisfies Module
