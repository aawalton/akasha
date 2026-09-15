import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const routeAccess = {
  id: "01a05afe-7a0f-7405-b894-524372b09614",
  type: "module",
  slug: "route-access",
  definition: "whether the person an account represents may reach a route",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A route opens only to a person with an access naming the route.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An access stating `all` names every route.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only an access of the route kind opens a route.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An access is asked for by the addresses its person and its kind are named by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account read to no person reaches no route.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A grant is read from the access pages rather than compiled in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Access pages that went unread open nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A decision carries why the decision refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here answers the caller.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No person is named here.",
    },
  ],
} as const satisfies Module
