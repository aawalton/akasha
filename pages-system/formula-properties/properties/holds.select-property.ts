import type { SelectProperty } from "../../select-properties/select-property.page-type.ts"

export const holds = {
  id: "01a06952-7a5c-7bad-8818-9124b8845f75",
  pageTypeSlug: "select-property",
  slug: "holds",
  propertySlug: "holds",
  definition: "the kind of value a formula works out",
  values: ["text", "number", "boolean", "instant", "date"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A formula answering another kind than the kind stated here is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind stated here is a kind the formula language names.",
    },
    {
      invariantKind: "departure",
      statement: "A reader puts a worked value down as the kind stated here.",
    },
    {
      invariantKind: "absence",
      statement: "No formula states a list.",
    },
  ],
} as const satisfies SelectProperty

export type Holds = (typeof holds.values)[number]
