import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sync = {
  id: "01a06579-f3d9-7007-b519-cafdb2cbafba",
  type: "page-type/module",
  slug: "sync",
  definition: "how code writes a page for each new course on the website of The Great Courses",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A course the collection already has is skipped rather than fetched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The date is recorded before the summary counting whether the date was recorded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Failing to record the sync date counts as a failure in the summary.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One course failing does not stop the courses after that course.",
    },
  ],
  createdAt: "2026-09-03T04:14:46.233Z",
  updatedAt: "2026-10-30T15:21:29.129Z",
} as const satisfies Module
