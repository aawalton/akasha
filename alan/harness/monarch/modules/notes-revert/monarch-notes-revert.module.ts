import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchNotesRevert = {
  id: "01a06865-ecc3-7197-8546-e38b32431638",
  type: "page-type/module",
  slug: "monarch-notes-revert",
  definition:
    "the notes and tags a transaction carried before this project wrote, and putting them back",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The before-picture is taken once and never taken again over itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run leaves an already standing snapshot alone and says how many rows postdate that snapshot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A row already standing as that row was snapshotted is passed over rather than rewritten.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A revert says the changes that revert would make before being asked to make the changes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Notes and tags are both put back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The live row is read on its own day before that row is judged rather than from our copy.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "The snapshot stands in one file under $HOME rather than as a page.",
    },
  ],
} as const satisfies Module
