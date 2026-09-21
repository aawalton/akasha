import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const entityTitles = {
  id: "01a0c637-c898-7363-adde-6f63d61cdf22",
  type: "page-type/record-property",
  slug: "entity-titles",
  propertySlug: "titles",
  definition: "what an entity's game has named it for, and what each naming does",
  properties: [
    { pageProperty: "text-property/sheet-name", required: true, many: false },
    { pageProperty: "text-property/sheet-effect", required: true, many: false },
    { pageProperty: "text-property/sheet-source", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A title is granted for what an entity did rather than learnt or born with.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
