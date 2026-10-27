import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const skillAttribute = {
  id: "01a17ebd-0fe1-701f-8c20-b038c1c009c4",
  type: "page-type/relation-property",
  slug: "skill-attribute",
  propertySlug: "attribute",
  definition: "the holder's own attribute that governs a held skill",
  targetPageType: "page-type/metric-character-attribute",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A held skill names its holder's own attribute page rather than one the world has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill no one attribute plainly governs names none.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T19:01:22.017Z",
  updatedAt: "2026-10-27T19:02:55.979Z",
} as const satisfies RelationProperty
