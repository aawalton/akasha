import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sourceCredit = {
  id: "01a174d2-533f-7735-aefc-40e1ceaf15c3",
  type: "page-type/text-property",
  slug: "source-credit",
  propertySlug: "source-credit",
  definition: "the credit owed to where a property's values come from",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property stating a credit has the credit drawn beside its value on a page's screen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property stating no credit is drawn with none.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-25T20:48:23.359Z",
  updatedAt: "2026-10-25T20:48:23.359Z",
} as const satisfies TextProperty
