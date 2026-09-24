import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const invokedSeat = {
  id: "01a0686b-bfe9-7de3-9eeb-08993f0dc27e",
  type: "page-type/module",
  slug: "invoked-seat",
  definition: "which seat a command was invoked on, whether from a row of the panel or from a tab",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A command invoked from a terminal tab reaches the seat in that tab.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tab is matched to a seat by the instance id ending the tab's uri path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A uri of any other scheme names no seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path whose last segment is no whole number names no seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is taken only where that row reads as a seat that is running or stopped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent row is no target for an act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A click on a seat has the seat's id and the seat's name and nothing more.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here acts on a seat.",
    },
  ],
} as const satisfies Module
