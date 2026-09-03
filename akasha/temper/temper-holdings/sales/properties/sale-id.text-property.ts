import type { TextProperty } from "@akasha/pages-system/text-property"

export type SaleId = string

export const saleId = {
  id: "01a0685d-89aa-73f0-9b15-bfabe8437be8",
  pageTypeSlug: "text-property",
  slug: "sale-id",
  propertySlug: "sale-id",
  definition: "what the game calls one sale",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    { invariantKind: "departure", statement: "A sale carrying no sale id is not kept." },
  ],
} as const satisfies TextProperty
