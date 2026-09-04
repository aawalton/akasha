import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { RelationshipDepositDate } from "./properties/relationship-deposit-date.calendar-date-property.ts"
import type { RelationshipDepositPersonaSlug } from "./properties/relationship-deposit-persona-slug.relation-property.ts"
import type { RelationshipDepositRelationshipSlug } from "./properties/relationship-deposit-relationship-slug.relation-property.ts"
import type { RelationshipDepositSize } from "./properties/relationship-deposit-size.select-property.ts"
import type { RelationshipDepositValueSlug } from "./properties/relationship-deposit-value-slug.relation-property.ts"

export type RelationshipDeposit = Page & {
  title: Title
  relationshipDepositDate: RelationshipDepositDate
  relationshipDepositPersonaSlug: RelationshipDepositPersonaSlug
  relationshipDepositRelationshipSlug: RelationshipDepositRelationshipSlug
  relationshipDepositSize: RelationshipDepositSize
  relationshipDepositValueSlug: RelationshipDepositValueSlug
}

export const relationshipDeposit = {
  id: "01a0658d-16bc-7759-82e4-2d059f33ac84",
  pageTypeSlug: "page-type",
  slug: "relationship-deposit",
  definition: "one thing Alan did that put something into a relationship",
  pluralSlug: "relationship-deposits",
  extendsSlug: "page-type/page",
  partSlugs: [
    "calendar-date-property/relationship-deposit-date",
    "relation-property/relationship-deposit-persona-slug",
    "relation-property/relationship-deposit-relationship-slug",
    "relation-property/relationship-deposit-value-slug",
    "select-property/relationship-deposit-size",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "relationship-deposit-date", required: true, many: false },
    { pagePropertySlug: "relationship-deposit-persona-slug", required: true, many: false },
    { pagePropertySlug: "relationship-deposit-relationship-slug", required: true, many: false },
    { pagePropertySlug: "relationship-deposit-size", required: true, many: false },
    { pagePropertySlug: "relationship-deposit-value-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A deposit names the relationship it went into rather than a person.",
    },
    {
      invariantKind: "departure",
      statement: "A deposit names the value it served.",
    },
  ],
} as const satisfies PageType
