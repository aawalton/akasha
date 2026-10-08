import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const intentStack = {
  id: "01a058a3-b01f-7002-b869-8274ae8203a6",
  type: "page-type/record-property",
  slug: "intent-stack",
  propertySlug: "intent-stack",
  definition: "what an initiative is to make so",
  properties: [
    {
      pageProperty: "standard-agent-english-property/intent-statement",
      required: true,
      many: false,
    },
    {
      pageProperty: "text-property/working-memory",
      required: false,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An intent says only a thing that is not yet so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An intent is a gap rather than stating which kind of decision that intent is.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-31T16:25:17.599Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RecordProperty
