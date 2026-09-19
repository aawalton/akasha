import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const routeAccess = {
  id: "01a05afe-7a0f-7405-b894-524372b09614",
  type: "page-type/module",
  slug: "route-access",
  definition: "whether the person a caller represents may reach a route",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A route opens only to a person with an access naming the route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An access stating `all` names every route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an access of the route kind opens a route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An access is asked for by the addresses its person and its kind are named by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account read to no person reaches no route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor read to no person reaches no route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor and an account reach a route the same way, through the person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grant is read from the access pages rather than compiled in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Access pages that went unread open nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A decision carries why the decision refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here answers the caller.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No person is named here.",
    },
  ],
} as const satisfies Module
