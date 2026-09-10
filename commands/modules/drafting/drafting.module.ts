import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const drafting = {
  id: "01a06315-8aa2-7993-a0d0-9ec51066ecaf",
  pageTypeSlug: "module",
  type: "module",
  slug: "drafting",
  definition: "what a run of a change does about the checks and the readings owed",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The checks a change kind runs and the readings that kind owes are what a run of it does.",
    },
    {
      invariantKind: "departure",
      statement: "A call with no change kind runs every check and owes every reading.",
    },
    {
      invariantKind: "departure",
      statement: "The commit at HEAD is read from git rather than carried by a caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into the worktree.",
    },
    {
      invariantKind: "absence",
      statement: "No whole body is carried here.",
    },
    {
      invariantKind: "gap",
      statement: "Reading the commit at HEAD is a second concern.",
    },
    {
      invariantKind: "gap",
      statement: "This module holds more than one concern.",
    },
    {
      invariantKind: "gap",
      statement: "The slug names drafting.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here drafts.",
    },
  ],
} as const satisfies Module
