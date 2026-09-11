import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const tunnelRouteDiscovery = {
  id: "01a06810-1262-7570-bae6-93d030d82053",
  pageTypeSlug: "module",
  type: "module",
  slug: "tunnel-route-discovery",
  definition: "the tunnel routes the checkout declares, gathered and checked for clashes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A routes file is the file of a page stating the routes property.",
    },
    {
      invariantKind: "absence",
      statement: "No name for that file is spelled here.",
    },
  ],
} as const satisfies Module
