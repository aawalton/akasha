import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const coursesQuery = {
  id: "01a06579-f3d9-7003-83c3-1c73c2fbe33b",
  type: "page-type/module",
  slug: "courses-query",
  definition: "how code finds the page that holds each course from The Great Courses",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row holding no id or no slug is left out of the index.",
    },
  ],
  createdAt: "2026-09-03T04:14:46.233Z",
  updatedAt: "2026-10-30T15:18:26.045Z",
} as const satisfies Module
