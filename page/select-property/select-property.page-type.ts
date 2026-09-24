import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const selectProperty = {
  id: "01a063de-2c60-7003-a9bc-92d52325a70d",
  type: "page-type/page-type",
  slug: "select-property",
  definition: "a page property with one of a set of values the property states",
  icon: "circle-chevron-down",
  parts: [
    "record-property/select-option-colors",
    "relation-property/select-option-color",
    "text-property/select-option-value",
    "text-property/select-values",
  ],
  extends: ["page-type/page-property"],
  properties: [
    { pageProperty: "text-property/select-values", required: false, many: true, maxCount: null },
    {
      pageProperty: "record-property/select-option-colors",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A select property states its values as page data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A select property stating none takes the values and colors its page type states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type whose every property chooses from one set states that set once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A select property's file exports the union of the values the page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value outside the set is refused rather than kept as text.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A text property with a hand-written union is no select property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A select property states as page data which color each value is drawn in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the page states no color for is drawn in the color a badge already has.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
