import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const selectOptionColors = {
  id: "01a0c532-8eb2-7ed9-a00c-740c098da3a3",
  type: "page-type/record-property",
  slug: "select-option-colors",
  propertySlug: "option-colors",
  definition: "the color in which each of a select property's values is drawn",
  properties: [
    { pageProperty: "text-property/select-option-value", required: true, many: false },
    { pageProperty: "relation-property/select-option-color", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value named on no line here is drawn in whatever color a badge already has.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
