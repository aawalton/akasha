import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const relationshipDeposit = {
  id: "01a0658d-16bc-7759-82e4-2d059f33ac84",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "relationship-deposit",
  definition: "one thing Alan did that put something into a relationship",
  pluralSlug: "relationship-deposits",
  extends: ["page-type/page"],
  parts: [
    "calendar-date-property/relationship-deposit-date",
    "relation-property/relationship-deposit-persona",
    "relation-property/relationship-deposit-relationship",
    "relation-property/relationship-deposit-value",
    "select-property/relationship-deposit-size",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "calendar-date-property/relationship-deposit-date",
      required: true,
      many: false,
    },
    {
      pageProperty: "relation-property/relationship-deposit-persona",
      required: true,
      many: false,
    },
    {
      pageProperty: "relation-property/relationship-deposit-relationship",
      required: true,
      many: false,
    },
    { pageProperty: "select-property/relationship-deposit-size", required: true, many: false },
    {
      pageProperty: "relation-property/relationship-deposit-value",
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
  types: "ts",
} as const satisfies PageType
