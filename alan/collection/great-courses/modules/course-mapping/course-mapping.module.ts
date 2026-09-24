import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const courseMapping = {
  id: "01a06579-f3d9-7002-8c59-6aa5c1dd9e49",
  type: "page-type/module",
  slug: "course-mapping",
  definition:
    "the shelves a course sits on, taken from the subjects whose listing names that course",
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
} as const satisfies Module
