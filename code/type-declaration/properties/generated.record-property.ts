import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const generated = {
  id: "01a08235-0ea1-7f91-8c09-9014555e81bc",
  type: "page-type/record-property",
  slug: "generated",
  propertySlug: "generated",
  definition: "the command writing a declaration again and the declaration's source version",
  properties: [
    { pageProperty: "text-property/written-by", required: true, many: false },
    { pageProperty: "number-property/source-version", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration stating nothing here was written by hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page states the command rather than the declaration file's own first lines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edit by hand to a generated declaration is lost at the next run.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
