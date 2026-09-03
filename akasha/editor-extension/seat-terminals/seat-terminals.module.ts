import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatTerminals = {
  id: "01a0686b-bfe9-73ac-9c09-182376783320",
  pageTypeSlug: "module",
  slug: "seat-terminals",
  definition:
    "which of this window's terminals a seat is working in, and which column each sits in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A terminal is matched to a seat through the process running in it.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal in no editor group names no column.",
    },
    {
      invariantKind: "departure",
      statement: "A tab that is no terminal names no instance id.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep that reads no process rows looks up no seat name.",
    },
    {
      invariantKind: "departure",
      statement: "The seat names and the tmux clients are read within one call.",
    },
    {
      invariantKind: "departure",
      statement: "How long the sweep took is answered with what the sweep found.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here remembers a column.",
    },
  ],
} as const satisfies Module
