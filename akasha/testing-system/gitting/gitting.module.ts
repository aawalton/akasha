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
        "The repo is named by its root rather than by the folder the test happens to be run from, so nothing depends on where it was called.",
    },
    {
      invariantKind: "departure",
      statement:
        "What git says on the error stream is caught rather than shown or thrown away, so a run that passes stays quiet and a run that fails still carries what git said.",
    },
    {
      invariantKind: "departure",
      statement:
        "The commit a repo stands at is taken from landing, which answers it for the door already, so a test and the door read HEAD by one rule.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here is reached by the door. The command system runs git through its own landing, and this is for tests standing a repo up to look at it.",
    },
  ],
} as const satisfies Module
