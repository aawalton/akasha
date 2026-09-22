import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tunnelRouteDiscovery = {
  id: "01a06810-1262-7570-bae6-93d030d82053",
  type: "page-type/module",
  slug: "tunnel-route-discovery",
  definition: "the tunnel routes the checkout declares, gathered and checked for clashes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A route is a record on the page stating that route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The routes are read off the index rather than out of any file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of any type states routes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name and a host name each belong to one route across every page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route stating an empty name, host name or service is refused here.",
    },
  ],
} as const satisfies Module
