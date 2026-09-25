import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const slidePoints = {
  id: "01a0d622-64e3-7e78-9130-2e3cff875865",
  type: "page-type/record-property",
  slug: "slide-points",
  propertySlug: "points",
  definition: "one item a slide lists",
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/slide-point-value", required: false, many: false },
    { pageProperty: "text-property/description", required: false, many: false },
    { pageProperty: "select-property/slide-point-color", required: false, many: false },
    { pageProperty: "number-property/slide-point-fill", required: false, many: false },
    { pageProperty: "select-property/slide-point-icon", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slide shows its points in the order they are listed.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
