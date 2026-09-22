import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const reagentNames = {
  id: "01a05fd1-d43d-7249-ac3e-8dcf8869e271",
  type: "page-type/text-property",
  slug: "reagent-names",
  propertySlug: "names",
  definition: "a recipe's reagents",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    { decisionKind: "decision-kind/gap", statement: "This property is a relation to a reagent." },
    {
      decisionKind: "decision-kind/departure",
      statement: "One list holds every reagent one recipe takes.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
