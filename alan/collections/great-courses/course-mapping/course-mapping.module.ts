import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const courseMapping = {
  id: "01a06579-f3d9-7002-8c59-6aa5c1dd9e49",
  type: "module",
  slug: "course-mapping",
  definition:
    "the shelves a course sits on, taken from the subjects whose listing names that course",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A course sits on the All Great Courses shelf whatever subjects name that course.",
    },
    {
      invariantKind: "departure",
      statement: "A subject shelf the store does not have is warned about rather than refused.",
    },
  ],
} as const satisfies Module
