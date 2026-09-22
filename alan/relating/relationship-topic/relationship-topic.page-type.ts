import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const relationshipTopic = {
  id: "01a0658a-170f-73cd-a458-8f98d995452e",
  type: "page-type/page-type",
  slug: "relationship-topic",
  definition: "a subject Alan and another person have to work through together",
  extends: ["page-type/page"],
  parts: [
    "relation-property/relationship-topic-parent",
    "multi-relation-property/relationship-topic-people",
    "select-property/relationship-topic-sensitivity",
    "select-property/relationship-topic-status",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "relation-property/relationship-topic-parent",
      required: false,
      many: false,
    },
    {
      pageProperty: "multi-relation-property/relationship-topic-people",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "select-property/relationship-topic-sensitivity",
      required: true,
      many: false,
    },
    { pageProperty: "select-property/relationship-topic-status", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship topic is under another relationship topic or under no topic.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship topic names the people that topic is held with.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A person named here is a person the system reaches rather than a relationship.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
