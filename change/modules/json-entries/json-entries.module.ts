import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jsonEntries = {
  id: "01a08239-7cf2-7f52-8f52-49c5a92d21c1",
  type: "module",
  slug: "json-entries",
  definition: "a key a JSON body holds at its top level",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body whose top level is no object answers no object.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body's own top-level object is answered apart from any key the body has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An entry goes with the space before that entry back to where the preceding entry ended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry followed by a comma goes with that comma.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry followed by no comma goes back to take the comma before that entry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry dropped straight after its neighbour reaches back for no comma.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry the caller does not name is left where that entry is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No comma is taken twice where neighbours go together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run going out of the end takes the comma before that run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body a run went out of reads as JSON.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk or an index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here rewrites a body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body of entries is read one entry to a line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key named goes from every entry of a body of entries that states it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line holding nothing but space is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A passage over an entry is placed against the whole body rather than its own line.",
    },
  ],
} as const satisfies Module
