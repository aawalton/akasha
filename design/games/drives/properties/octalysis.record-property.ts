import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const octalysis = {
  id: "01a06756-f604-7da5-89c2-26d073aeedb1",
  type: "record-property",
  slug: "octalysis",
  propertySlug: "octalysis",
  definition: "how Chou's own system names and numbers a drive",
  properties: [
    { pageProperty: "number-property/octalysis-number", required: true, many: false },
    { pageProperty: "text-property/octalysis-name", required: true, many: false },
    { pageProperty: "text-property/octalysis-definition", required: true, many: false },
  ],
  types: "ts",
} as const satisfies RecordProperty
