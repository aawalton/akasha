import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const deviceTokenPerson = {
  id: "01a05dc7-77db-73e5-a433-7a5181faab7e",
  type: "page-type/relation-property",
  slug: "device-token-person",
  propertySlug: "person",
  definition: "the person whose device has a token",
  targetPageType: "page-type/person",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The account a person signed in under is read from that person rather than kept here.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T16:22:28.571Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RelationProperty
