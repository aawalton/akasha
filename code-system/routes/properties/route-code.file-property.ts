import type { FileProperty } from "@akasha/pages-system/file-property"

export type RouteCode = "ts" | "tsx"

export const routeCode = {
  id: "01a071dc-83c6-73f2-9948-9d3c5e18ce9f",
  pageTypeSlug: "file-property",
  slug: "route-code",
  propertySlug: "code",
  definition: "the code a route is",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A route drawing something for a browser is written in TSX.",
    },
    {
      invariantKind: "departure",
      statement: "A route answering with data alone is written in TypeScript.",
    },
  ],
} as const satisfies FileProperty
