import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type ParameterName = string

export const parameterName = {
  id: "01a063ee-2a3b-738a-b58e-4974630c06f2",
  pageTypeSlug: "text-property",
  slug: "parameter-name",
  propertySlug: "name",
  definition: "what one value a query is given is called",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is unique among the parameters one query takes.",
    },
  ],
} as const satisfies TextProperty
