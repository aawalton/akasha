import type { FileProperty } from "@akasha/pages-system/file-property"

export type RouteTest = "ts" | "tsx"

export const routeTest = {
  id: "01a071dc-83c6-7d33-b8f1-64b3986f1f58",
  pageTypeSlug: "file-property",
  slug: "route-test",
  propertySlug: "test",
  definition: "what proves a route's code",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test proving code written in TSX is written in TSX too.",
    },
  ],
} as const satisfies FileProperty
