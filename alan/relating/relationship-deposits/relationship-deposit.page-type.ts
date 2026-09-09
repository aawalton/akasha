import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { RelationshipDepositDate } from "./properties/relationship-deposit-date.calendar-date-property.ts"
import type { RelationshipDepositPersona } from "./properties/relationship-deposit-persona.relation-property.ts"
import type { RelationshipDepositRelationship } from "./properties/relationship-deposit-relationship.relation-property.ts"
import type { RelationshipDepositSize } from "./properties/relationship-deposit-size.select-property.ts"
import type { RelationshipDepositValue } from "./properties/relationship-deposit-value.relation-property.ts"

export type RelationshipDeposit = Page & {
  title: Title
  relationshipDepositDate: RelationshipDepositDate
  relationshipDepositPersona: RelationshipDepositPersona
  relationshipDepositRelationship: RelationshipDepositRelationship
  relationshipDepositSize: RelationshipDepositSize
  relationshipDepositValue: RelationshipDepositValue
}

export const relationshipDeposit = {
  id: "01a0658d-16bc-7759-82e4-2d059f33ac84",
  pageTypeSlug: "page-type",
  slug: "relationship-deposit",
  definition: "one thing Alan did that put something into a relationship",
  pluralSlug: "relationship-deposits",
  extends: ["page-type/page"],
  partSlugs: [
    "calendar-date-property/relationship-deposit-date",
    "relation-property/relationship-deposit-persona",
    "relation-property/relationship-deposit-relationship",
    "relation-property/relationship-deposit-value",
    "select-property/relationship-deposit-size",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    {
      pagePropertySlug: "calendar-date-property/relationship-deposit-date",
      required: true,
      many: false,
    },
    {
      pagePropertySlug: "relation-property/relationship-deposit-persona",
      required: true,
      many: false,
    },
    {
      pagePropertySlug: "relation-property/relationship-deposit-relationship",
      required: true,
      many: false,
    },
    { pagePropertySlug: "select-property/relationship-deposit-size", required: true, many: false },
    {
      pagePropertySlug: "relation-property/relationship-deposit-value",
      required: true,
      many: false,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A deposit names the relationship that deposit went into rather than a person.",
    },
    {
      invariantKind: "departure",
      statement: "A deposit names the value that deposit served.",
    },
  ],
} as const satisfies PageType
