import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const routeCode = {
  id: "01a071dc-83c6-73f2-9948-9d3c5e18ce9f",
  type: "page-type/code-file-property",
  slug: "route-code",
  propertySlug: "code",
  definition: "the code a route is",
  extensions: ["ts", "tsx"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A route drawing something for a browser is written in TSX.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route answering with data alone is written in TypeScript.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-05T13:57:52.198Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies CodeFileProperty
