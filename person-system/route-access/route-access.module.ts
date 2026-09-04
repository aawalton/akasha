import type { Module } from "@akasha/code-system/module"

export const routeAccess = {
  id: "01a05afe-7a0f-7405-b894-524372b09614",
  pageTypeSlug: "module",
  slug: "route-access",
  definition: "whether the person an account stands for may reach a route",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A route opens only to a person holding an access naming the route.",
    },
    {
      invariantKind: "departure",
      statement: "An access stating `all` names every route.",
    },
    {
      invariantKind: "departure",
      statement: "Only an access of the route kind opens a route.",
    },
    {
      invariantKind: "departure",
      statement: "An account read to no person reaches no route.",
    },
    {
      invariantKind: "departure",
      statement: "A grant is read from the access pages rather than compiled in.",
    },
    {
      invariantKind: "departure",
      statement: "Access pages that went unread open nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A decision carries why the decision refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers the caller.",
    },
    {
      invariantKind: "absence",
      statement: "No person is named here.",
    },
  ],
} as const satisfies Module
