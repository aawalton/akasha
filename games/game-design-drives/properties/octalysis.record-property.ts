import type { RecordProperty } from "../../../pages/record-properties/record-property.page-type.ts"
import type { OctalysisDefinition } from "./octalysis-definition.text-property.ts"
import type { OctalysisName } from "./octalysis-name.text-property.ts"
import type { OctalysisNumber } from "./octalysis-number.number-property.ts"

export type Octalysis = {
  number: OctalysisNumber
  name: OctalysisName
  definition: OctalysisDefinition
}

export const octalysis = {
  id: "01a06756-f604-7da5-89c2-26d073aeedb1",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "octalysis",
  propertySlug: "octalysis",
  definition: "how Chou's own system names and numbers a drive",
  properties: [
    { pageProperty: "number-property/octalysis-number", required: true, many: false },
    { pageProperty: "text-property/octalysis-name", required: true, many: false },
    { pageProperty: "text-property/octalysis-definition", required: true, many: false },
  ],
} as const satisfies RecordProperty
