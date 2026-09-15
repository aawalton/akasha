import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const answersACheckoutRoot = {
  id: "01a08e6d-891c-7ef0-9e07-15a09351a84e",
  type: "page-type/boolean-property",
  slug: "answers-a-checkout-root",
  propertySlug: "answers-a-checkout-root",
  definition: "whether a module answers a checkout root",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A module saying nothing here answers no checkout root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A module that answers where a checkout sits says true here rather than being named elsewhere.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
