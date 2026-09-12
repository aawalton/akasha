import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const codeMoving = {
  id: "01a09467-62d1-7e1e-b24d-b6186ad6cf98",
  type: "module",
  slug: "code-moving",
  definition: "whether the tree a run's code came out of has moved since that run started",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The commit a tree sits at is the one the file git keeps that tree's HEAD in holds.",
    },
    {
      invariantKind: "departure",
      statement: "Reading that commit is one read of one small file rather than a run of git.",
    },
    {
      invariantKind: "departure",
      statement: "A HEAD naming a branch is followed one hop to the file that branch is kept in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A branch git keeps nowhere loose is read as the line naming it, which never moves.",
    },
    {
      invariantKind: "departure",
      statement: "A commit no file gives back is no commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tree a run came out of is read off the path this module itself was loaded from.",
    },
    {
      invariantKind: "departure",
      statement: "A run loaded from outside every tree came out of no tree.",
    },
    {
      invariantKind: "departure",
      statement: "Code that came out of no tree has moved for nothing any tree does.",
    },
    {
      invariantKind: "departure",
      statement: "The commit a run started at is taken as this module is first imported.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run leaves on the one exit every long-running unit is written to start again for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run says on the way out the commit it started at and the commit it is leaving for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rules on whether the point this is called at is safe.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here waits, and nothing here does a unit of work.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs git.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks systemd anything.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a kind of tree.",
    },
  ],
} as const satisfies Module
