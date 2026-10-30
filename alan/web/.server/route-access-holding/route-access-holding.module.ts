import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const routeAccessHolding = {
  id: "01a0655e-d39a-7381-af75-83593fd6c7b1",
  type: "page-type/module",
  slug: "route-access-holding",
  definition: "whether a person can reach a route",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A call handing over a request reads the session on it before any account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call handing over no request is read by its account alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller already read to a contributor or an account is decided without a read.",
    },
  ],
  createdAt: "2026-09-03T03:45:08.506Z",
  updatedAt: "2026-10-30T16:53:42.197Z",
} as const satisfies Module
