import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const listingReadiness = {
  id: "01a0e1b5-3737-7636-9d4d-147e23ec7960",
  type: "page-type/module",
  slug: "listing-readiness",
  definition:
    "whether a listing's own question was answered, and the rows that listing last showed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing is loaded only once its own question was answered.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Rows another reader put in the store never make a listing loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing answered once in a session is answered for the rest of that session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing asked again shows the rows it last held while it is read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Held rows are kept for a bounded number of the listings read most lately.",
    },
  ],
} as const satisfies Module
