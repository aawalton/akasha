import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type ParameterType =
  | "text"
  | "number"
  | "instant"
  | "calendar-date"
  | "tracking-day"
  | "boolean"
  | "list(text)"

export const parameterType = {
  id: "01a063ee-2a3b-7dba-bd8e-70b39e540c34",
  pageTypeSlug: "text-property",
  slug: "parameter-type",
  propertySlug: "type",
  definition: "the type one value a query is given holds",
  max: 20,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A type a query cannot read is refused rather than dropped.",
    },
  ],
} as const satisfies TextProperty
