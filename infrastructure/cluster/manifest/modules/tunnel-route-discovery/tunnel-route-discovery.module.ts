import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tunnelRouteDiscovery = {
  id: "01a06810-1262-7570-bae6-93d030d82053",
  type: "module",
  slug: "tunnel-route-discovery",
  definition: "the tunnel routes the checkout declares, gathered and checked for clashes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A routes file is the file of a page stating the routes property.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No name for that file is spelled here.",
    },
  ],
} as const satisfies Module
