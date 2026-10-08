import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const spellings = {
  id: "01a0c565-e622-7337-8981-8bc641435b7e",
  type: "page-type/record-property",
  slug: "spellings",
  propertySlug: "spellings",
  definition: "how a term is written, in each part of speech that term has",
  properties: [
    { pageProperty: "relation-property/part-of-speech", required: true, many: false },
    { pageProperty: "text-property/spelling", required: true, many: false },
    { pageProperty: "relation-property/spelling-scope", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A term written differently in two parts of speech is one term rather than two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The grammar reads a word's part of speech from this property alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating nothing here is a page the grammar never looks a word up in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page whose slug is a word that page does not define states no spelling for that word.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-21T19:16:24.738Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies RecordProperty
