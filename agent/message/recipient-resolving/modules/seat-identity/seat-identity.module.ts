import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatIdentity = {
  id: "01a0691b-4f64-74ee-829a-1886f2b0a5e5",
  type: "page-type/module",
  slug: "seat-identity",
  definition: "the id of a seat found by its name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat still there is answered by akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that has stopped is answered by the history.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name in an old message still resolves to the seat that had that name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
