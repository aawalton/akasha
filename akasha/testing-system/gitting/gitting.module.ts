import type { Module } from "../../code-system/module/module.page-type.ts"

export const gitting = {
  id: "01a04eee-b581-7abb-b541-41013cd37875",
  pageTypeSlug: "module",
  slug: "gitting",
  definition: "git run against a repo a test stood up, and the commit it stands at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The repo is named by its root rather than by the folder the test happens to be run from.",
    },
    {
      invariantKind: "departure",
      statement: "What git says on the error stream is caught rather than shown or thrown away.",
    },
    {
      invariantKind: "departure",
      statement: "The commit a repo stands at is taken from landing.",
    },
    {
      invariantKind: "departure",
      statement: "Landing answers it for the door already.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is reached by the door.",
    },
    {
      invariantKind: "absence",
      statement: "This is for tests standing a repo up to look at it.",
    },
  ],
} as const satisfies Module
