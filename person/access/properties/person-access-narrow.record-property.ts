import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const personAccessNarrow = {
  id: "01a0c521-ea3a-7a55-a8ef-a8e26ef96cf6",
  type: "page-type/record-property",
  slug: "person-access-narrow",
  propertySlug: "narrow",
  definition: "the key and value every page an access reaches holds",
  properties: [
    { pageProperty: "text-property/access-narrow-key", required: true, many: false },
    { pageProperty: "text-property/access-narrow-is", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An access stating no narrow reaches every page of its target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow is a key and a value together, so neither is stated without the other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow is asked of the pages rather than weighed over the answer.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
