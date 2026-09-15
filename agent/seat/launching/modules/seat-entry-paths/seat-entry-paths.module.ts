import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatEntryPaths = {
  id: "01a08b87-db08-7b4d-8019-f88e7fd39f19",
  type: "page-type/module",
  slug: "seat-entry-paths",
  definition: "the files under the checkout a seat is started by running",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path here is written from the checkout rather than from the file reading it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where each entry sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug the index answers nothing for refuses the answer rather than guessing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checkout asked is the one given, or the one this code is checked out in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs a process.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a Bun global.",
    },
  ],
} as const satisfies Module
