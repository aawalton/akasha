import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const courseMapping = {
  id: "01a06579-f3d9-7002-8c59-6aa5c1dd9e49",
  type: "page-type/module",
  slug: "course-mapping",
  definition: "how code finds the collections a new course from The Great Courses sits in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A course sits on the All Great Courses shelf whatever subjects name that course.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subject shelf the store does not have is warned about rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shelf is named as a relation slug, so the page type it is comes with the name.",
    },
  ],
  createdAt: "2026-09-03T04:14:46.233Z",
  updatedAt: "2026-10-30T15:16:53.082Z",
} as const satisfies Module
