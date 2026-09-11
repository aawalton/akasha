import type { OctalysisDefinition } from "akasha/design/games/drives/properties/octalysis-definition.text-property.types.ts"
import type { OctalysisName } from "akasha/design/games/drives/properties/octalysis-name.text-property.types.ts"
import type { OctalysisNumber } from "akasha/design/games/drives/properties/octalysis-number.number-property.types.ts"
import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

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
