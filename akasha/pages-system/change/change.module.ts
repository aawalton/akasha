import type { Module } from "../../code-system/module/module.page-type.ts"

export const change = {
  id: "01a0542d-94cd-7695-b0dc-ad22cad9bdc4",
  pageTypeSlug: "module",
  slug: "change",
  definition: "a change to files, and the bodies before and after it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change is shown twice over.",
    },
    {
      invariantKind: "departure",
      statement: "Anything reading only `after` sees a state rather than a change.",
    },
    {
      invariantKind: "departure",
      statement:
        "`before` and `after` answer for any path rather than only one the change carries.",
    },
    {
      invariantKind: "departure",
      statement: "A path it never touched reads the base commit through both.",
    },
    {
      invariantKind: "departure",
      statement: "Audit is a change in which every file is unchanged.",
    },
  ],
} as const satisfies Module
