import type { SelectProperty } from "../../select-properties/select-property.page-type.types.ts"

export const holds = {
  id: "01a06952-7a5c-7bad-8818-9124b8845f75",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "holds",
  propertySlug: "holds",
  definition: "the kind of value a calculation works out",
  values: ["text", "number", "boolean", "instant", "date"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A calculation answering another kind than the kind stated here is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A reader puts a worked value down as the kind stated here.",
    },
    {
      invariantKind: "absence",
      statement: "No calculation states a list.",
    },
  ],
} as const satisfies SelectProperty

export type Holds = (typeof holds.values)[number]
