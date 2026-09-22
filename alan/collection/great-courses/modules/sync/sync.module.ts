import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sync = {
  id: "01a06579-f3d9-7007-b519-cafdb2cbafba",
  type: "page-type/module",
  slug: "sync",
  definition: "a run of the catalogue into a page for each course the collection does not hold",
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
} as const satisfies Module
