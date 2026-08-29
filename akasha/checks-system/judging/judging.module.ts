import type { Module } from "../../code-system/module/module.page-type.ts"

export const judging = {
  id: "01a04bc4-7e86-7fa6-8d9b-5532730b7daf",
  pageTypeSlug: "module",
  slug: "judging",
  definition: "the change a check is shown, and the refusals it answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing here imports a check or a door.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change is shown twice over: `at` answers the body the change leaves, and `was` answers the body it found. A check reading only `at` sees a state rather than a change.",
    },
    {
      invariantKind: "departure",
      statement:
        "`at` and `was` answer for any path, not only one the change carries, and a path it never touched reads the base commit through both.",
    },
    {
      invariantKind: "departure",
      statement:
        "Audit is a change in which every file is unchanged, so `was` and `at` answer alike there and nothing reads as added or taken away.",
    },
  ],
} as const satisfies Module
