import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const createCourse = {
  id: "01a06579-f3d9-7005-80a2-939e9bfae257",
  type: "page-type/module",
  slug: "create-course",
  definition: "a course written as a `great-course` page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A course is handed to the store as its values, and the store renders the body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A course is written as a new page, so a course already filed is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A course is filed under the name the catalogue's own identifier gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalogue naming no identifier has one read off the course's own address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name past what a slug holds is shortened here rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A course states the title, the shelves it sits on, and the provider's record.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here states the minutes a course runs to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write the store refused is counted as one course failed rather than thrown.",
    },
  ],
} as const satisfies Module
