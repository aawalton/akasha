import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatStart = {
  id: "01a069cb-0380-743c-a13d-87b9feb0bbf1",
  type: "page-type/module",
  slug: "seat-start",
  definition: "how a command starts a seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ops dispatcher imports this module and calls the default export that module declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The command reads arguments and writes the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The function the command calls reads no argument and writes no answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The parent a caller states is the parent the seat is given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A start stating no parent reads the parent from this process's own environment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A headless start launches the seat here and an interactive start leaves that seat detached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat no page was written for is refused rather than launched blank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A start naming no persona and no role takes the default of each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A default is taken after the persona a start named is judged against its principal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A headless start answers the pid that start launched and an interactive start answers no pid.",
    },
  ],
} as const satisfies Module
