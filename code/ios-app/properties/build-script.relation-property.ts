import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const buildScript = {
  id: "01a059b5-9616-700c-8d3b-e1a440b57051",
  type: "page-type/relation-property",
  slug: "build-script",
  propertySlug: "build-script",
  definition: "the script that builds an app",
  targetPageType: "page-type/shell-script",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An app stating no build script is not built by any command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which script builds an app is read from its page rather than walked to.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-31T21:24:27.798Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RelationProperty
