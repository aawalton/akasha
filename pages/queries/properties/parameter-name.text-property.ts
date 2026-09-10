import type { TextProperty } from "../../text-properties/text-property.page-type.types.ts"

export type ParameterName = string

export const parameterName = {
  id: "01a063ee-2a3b-738a-b58e-4974630c06f2",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "parameter-name",
  propertySlug: "name",
  definition: "what one value a query is given is called",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is unique among the parameters one query takes.",
    },
  ],
} as const satisfies TextProperty
