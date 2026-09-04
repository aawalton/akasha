import type { Module } from "../../code-system/modules/module.page-type.ts"

export const invokedSeat = {
  id: "01a0686b-bfe9-7de3-9eeb-08993f0dc27e",
  pageTypeSlug: "module",
  slug: "invoked-seat",
  definition: "which seat a command was invoked on, whether from a row of the panel or from a tab",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command invoked from a terminal tab reaches the seat standing in that tab.",
    },
    {
      invariantKind: "departure",
      statement: "A tab is matched to a seat by the instance id ending the tab's uri path.",
    },
    {
      invariantKind: "departure",
      statement: "A uri of any other scheme names no seat.",
    },
    {
      invariantKind: "departure",
      statement: "A path ending in what is no whole number names no seat.",
    },
    {
      invariantKind: "departure",
      statement: "A row is taken only where it reads as a seat that is running or stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent row is no target for an act.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here acts on a seat.",
    },
  ],
} as const satisfies Module
