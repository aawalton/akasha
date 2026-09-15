import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const directives = {
  id: "01a04e1f-cbf6-7150-812b-844b9bf21ed2",
  type: "page-type/record-property",
  slug: "directives",
  propertySlug: "directives",
  definition: "what a domain tells whoever reads it to do, each with the sort it is",
  properties: [
    { pageProperty: "relation-property/directive-kind", required: true, many: false },
    { pageProperty: "text-property/name", required: true, many: false },
    { pageProperty: "standard-agent-english-property/act", required: true, many: false },
    { pageProperty: "standard-agent-english-property/warrant", required: true, many: false },
    {
      pageProperty: "standard-agent-english-property/aids",
      required: true,
      many: true,
      maxCount: 10,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One list has every directive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A directive needing more aids than that directive may hold has design belonging in an decision.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
