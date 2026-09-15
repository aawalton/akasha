import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deviceTokenContext = {
  id: "01a0655e-d399-7f83-8b69-496707b129e5",
  type: "page-type/module",
  slug: "device-token-context",
  definition: "the account a push registration is made for, read out of the request",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bearer token naming a user settles the account and the session is not read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bearer token naming nobody leaves the session to settle the account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request carrying no bearer token is read from its session alone.",
    },
  ],
} as const satisfies Module
