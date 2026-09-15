import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchNotesWrite = {
  id: "01a06863-ac0c-7d5f-9e84-4f2e2d021b08",
  type: "module",
  slug: "monarch-notes-write",
  definition: "the note and the tags written back onto a Monarch transaction",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A note is written only where a live read at the moment of writing shows no note.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A transaction Monarch does not report on the day asked for is refused rather than written blind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The standing transaction is returned.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller says which transaction was passed over and why.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A note written has the tag saying a machine wrote that note.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Setting tags states the whole list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The standing tags are carried rather than replaced.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "Blank space is no note.",
    },
  ],
} as const satisfies Module
