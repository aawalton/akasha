import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sync = {
  id: "01a06579-f3d9-7007-b519-cafdb2cbafba",
  pageTypeSlug: "module",
  slug: "sync",
  definition: "one run of the catalogue into a page for each course the collection does not hold",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A course the collection already holds is skipped rather than fetched.",
    },
    {
      invariantKind: "departure",
      statement: "The date is recorded before the summary counting whether the date was recorded.",
    },
    {
      invariantKind: "departure",
      statement: "Failing to record the sync date counts as a failure in the summary.",
    },
    {
      invariantKind: "departure",
      statement: "One course failing does not stop the courses after that course.",
    },
  ],
} as const satisfies Module
