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
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An intent says only a thing that is not yet so.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An intent is a gap rather than stating which kind of invariant that intent is.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
