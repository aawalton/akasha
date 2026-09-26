import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const styleExamples = {
  id: "01a0de9c-aef3-7859-9a3e-73e2e5be79a8",
  type: "page-type/record-property",
  slug: "style-examples",
  propertySlug: "examples",
  definition: "prose breaking a style rule beside the same prose meeting it",
  properties: [
    { pageProperty: "text-property/style-example-before", required: true, many: false },
    { pageProperty: "text-property/style-example-after", required: true, many: false },
  ],
  types: "ts",
} as const satisfies RecordProperty
