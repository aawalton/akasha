import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const conversation = {
  id: "01a0d44c-37ba-7558-91d4-4633e3c24b5f",
  type: "page-type/computed-property",
  slug: "conversation",
  propertySlug: "conversation",
  definition: "what was said in a seat since its last compaction, one entry to a record",
  holds: "records",
  askedByName: true,
  properties: [
    { pageProperty: "select-property/conversation-entry-kind", required: true, many: false },
    { pageProperty: "text-property/conversation-text", required: false, many: false },
    { pageProperty: "number-property/conversation-images", required: false, many: false },
    { pageProperty: "text-property/conversation-line", required: false, many: false },
    { pageProperty: "instant-property/conversation-at", required: false, many: false },
  ],
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's conversation is read from the transcript its transcript path names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The transcript is read through the reach, as the conversation shaping shapes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat naming no transcript, or naming one that is not there, has no conversation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A conversation is worked out afresh for every question naming it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No copy of a conversation is kept.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
