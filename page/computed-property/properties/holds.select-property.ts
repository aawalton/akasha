import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const holds = {
  id: "01a06952-7a5c-7bad-8818-9124b8845f75",
  type: "page-type/select-property",
  slug: "holds",
  propertySlug: "holds",
  definition: "the kind of value a calculation works out",
  values: ["text", "number", "boolean", "instant", "date", "relation"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation answering another kind than the kind stated here is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader puts a worked value down as the kind stated here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No calculation states a list.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
