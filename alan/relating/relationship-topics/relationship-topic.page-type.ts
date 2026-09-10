import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const relationshipTopic = {
  id: "01a0658a-170f-73cd-a458-8f98d995452e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "relationship-topic",
  definition: "one subject Alan and another person have to work through together",
  pluralSlug: "relationship-topics",
  extends: ["page-type/page"],
  parts: [
    "relation-property/relationship-topic-parent",
    "relation-property/relationship-topic-people",
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
      pageProperty: "relation-property/relationship-topic-people",
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "A relationship topic is under another relationship topic or under no topic.",
    },
    {
      invariantKind: "departure",
      statement: "A relationship topic names the people that topic is held with.",
    },
    {
      invariantKind: "absence",
      statement: "A person named here is a person the system reaches rather than a relationship.",
    },
  ],
  types: "ts",
} as const satisfies PageType
