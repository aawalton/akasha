import type { List } from "../../page-properties/page-property.page-type.ts"
import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { ParameterName } from "./parameter-name.text-property.ts"
import type { ParameterType } from "./parameter-type.text-property.ts"

export type Parameter = {
  name: ParameterName
  type: ParameterType
}

export type Parameters = List<Parameter>

export const parameters = {
  id: "01a063ee-2a3b-76da-8c25-5b7c4aa9df28",
  pageTypeSlug: "record-property",
  slug: "parameters",
  propertySlug: "parameters",
  definition: "the values a query is given, each with the type it takes",
  properties: [
    { pagePropertySlug: "parameter-name", required: true, many: false },
    { pagePropertySlug: "parameter-type", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A narrow reaches a parameter by the parameter's name.",
    },
    {
      invariantKind: "departure",
      statement: "A query naming no parameters is asked as written.",
    },
  ],
} as const satisfies RecordProperty
