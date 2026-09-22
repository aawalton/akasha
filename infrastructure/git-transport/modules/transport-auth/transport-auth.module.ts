import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transportAuth = {
  id: "01a06816-2f11-7992-90a6-8cecd8ef0699",
  type: "page-type/module",
  slug: "transport-auth",
  definition: "who sends a request reaching the repositories",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A token is compared in constant time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A basic credential naming any user but the token user is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A basic credential closes the question.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No other way in is tried after a basic credential.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request a proxy already named a user for is taken at that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request naming nobody is answered as nobody rather than thrown over.",
    },
  ],
} as const satisfies Module
