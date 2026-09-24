import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const stylesheetColors = {
  id: "01a0d58f-e044-7855-8409-2f54825f72de",
  type: "page-type/record-property",
  slug: "stylesheet-colors",
  propertySlug: "colors",
  definition: "the custom properties a stylesheet writes from color pages, each with its color",
  properties: [
    { pageProperty: "text-property/stylesheet-color-name", required: true, many: false },
    { pageProperty: "relation-property/stylesheet-color", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The hex a custom property named here holds is the hex its color page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The `color-writing` change generator writes that hex into the rules.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
