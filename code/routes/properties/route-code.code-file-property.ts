import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export const routeCode = {
  id: "01a071dc-83c6-73f2-9948-9d3c5e18ce9f",
  type: "code-file-property",
  slug: "route-code",
  propertySlug: "code",
  definition: "the code a route is",
  extensions: ["ts", "tsx"],
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
  types: "ts",
} as const satisfies CodeFileProperty
