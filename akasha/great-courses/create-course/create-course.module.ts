import type { Module } from "../../code-system/modules/module.page-type.ts"

export const createCourse = {
  id: "01a06579-f3d9-7005-80a2-939e9bfae257",
  pageTypeSlug: "module",
  slug: "create-course",
  definition: "a course written as a `great-course` page",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Nothing renders a `great-course` page's body out of the keys carried here.",
    },
    {
      invariantKind: "stopgap",
      statement: "No course becomes a `great-course` page.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal comes before the course's detail page is fetched.",
    },
  ],
} as const satisfies Module
