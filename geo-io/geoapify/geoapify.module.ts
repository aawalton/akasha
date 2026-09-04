import type { Module } from "../../code-system/modules/module.page-type.ts"

export const geoapify = {
  id: "01a05c48-deeb-7002-a7d6-912bcaf143d2",
  pageTypeSlug: "module",
  slug: "geoapify",
  definition: "the geoapify calls turning a place name into a point and two points into a route",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A url is built without a request being made.",
    },
  ],
} as const satisfies Module
