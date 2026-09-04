import type { Module } from "@akasha/code-system/module"

export const transportAuth = {
  id: "01a06816-2f11-7992-90a6-8cecd8ef0699",
  pageTypeSlug: "module",
  slug: "transport-auth",
  definition: "who a request reaching the repositories is from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token is compared in constant time.",
    },
    {
      invariantKind: "departure",
      statement: "A basic credential naming any user but the token user is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A basic credential closes the question, so no other way in is tried after one.",
    },
    {
      invariantKind: "departure",
      statement: "A request a proxy already named a user for is taken at that name.",
    },
    {
      invariantKind: "departure",
      statement: "A request naming nobody is answered as nobody rather than thrown over.",
    },
  ],
} as const satisfies Module
