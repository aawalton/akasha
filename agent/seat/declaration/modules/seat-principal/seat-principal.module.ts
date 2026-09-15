import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatPrincipal = {
  id: "01a06949-b281-758a-b03f-cad660b7a2e7",
  type: "page-type/module",
  slug: "seat-principal",
  definition: "who a seat answers to, read from its page as a person or as the fleet",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with a person named on its page answers to that person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with no person but a principal seat name answers to the fleet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with neither value answers to nobody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The principal seat's id is looked up from the principal seat name.",
    },
  ],
} as const satisfies Module
