import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const overServer = {
  id: "01a05bd6-c533-7600-b18c-c96577f03603",
  type: "module",
  slug: "over-server",
  definition: "a page write sent to the server rather than run against the store",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A write sent to the server runs the exported function the store would have run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The guards inside that function judge a write from a browser unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The roster a guard reads comes from the route the app answers page types on.",
    },
  ],
} as const satisfies Module
