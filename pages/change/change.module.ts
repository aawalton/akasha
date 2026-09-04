import type { Module } from "@akasha/code-system/module"

export const change = {
  id: "01a0542d-94cd-7695-b0dc-ad22cad9bdc4",
  pageTypeSlug: "module",
  slug: "change",
  definition: "a change to files, and the bodies before and after it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change is shown as the body before the change and the body after the change.",
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
      statement:
        "A path the change never touched reads the base commit through `before` and `after`.",
    },
    {
      invariantKind: "departure",
      statement: "Audit is a change in which every file is unchanged.",
    },
  ],
} as const satisfies Module
