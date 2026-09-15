import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transportAuth = {
  id: "01a06816-2f11-7992-90a6-8cecd8ef0699",
  type: "module",
  slug: "transport-auth",
  definition: "who a request reaching the repositories is from",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token is compared in constant time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A basic credential naming any user but the token user is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A basic credential closes the question.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No other way in is tried after a basic credential.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request a proxy already named a user for is taken at that name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request naming nobody is answered as nobody rather than thrown over.",
    },
  ],
} as const satisfies Module
