import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatTerminals = {
  id: "01a0686b-bfe9-73ac-9c09-182376783320",
  type: "module",
  slug: "seat-terminals",
  definition:
    "which of this window's terminals a seat is working in, and which column each sits in",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A terminal is matched to a seat by the shell that terminal answers with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seat each shell works in is read off the file the service writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that could not be read is told apart from a file naming no seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A terminal in no editor group names no column.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tab that is no terminal names no instance id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How long the sweep took is answered with the seats the sweep found.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here remembers a column.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No child process is started here.",
    },
  ],
} as const satisfies Module
