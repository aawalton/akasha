import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const follows = {
  id: "01a0aa5f-a005-71bc-9953-a98187d70707",
  type: "page-type/record-property",
  slug: "follows",
  propertySlug: "follows",
  definition: "the attribute value a predicate follows an edge over",
  properties: [
    { pageProperty: "relation-property/followed-attribute", required: true, many: false },
    { pageProperty: "text-property/attribute-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A predicate following nothing follows every edge of the kinds it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A predicate following two values follows only an edge carrying both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One edge kind carrying many attributes is told apart here rather than divided.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A predicate follows an edge carrying any one of the values it names for an attribute.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
