import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type PersonSlug = Slug

export const deviceTokenPerson = {
  id: "01a05dc7-77db-73e5-a433-7a5181faab7e",
  pageTypeSlug: "relation-property",
  slug: "device-token-person",
  propertySlug: "person",
  definition: "the person whose device has a token",
  targetPageType: "page-type/person",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The account a person signed in under is read from that person rather than kept here.",
    },
  ],
} as const satisfies RelationProperty
