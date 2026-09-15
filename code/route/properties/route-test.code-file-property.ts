import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const routeTest = {
  id: "01a071dc-83c6-7d33-b8f1-64b3986f1f58",
  type: "page-type/code-file-property",
  slug: "route-test",
  propertySlug: "test",
  definition: "what proves a route's code",
  extensions: ["ts", "tsx"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A test proving code written in TSX is written in TSX too.",
    },
  ],
  types: "ts",
} as const satisfies CodeFileProperty
