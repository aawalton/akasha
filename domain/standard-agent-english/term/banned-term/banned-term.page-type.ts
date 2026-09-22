import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const bannedTerm = {
  id: "01a081ea-d66b-7bae-bde1-753ebd310536",
  type: "page-type/page-type",
  slug: "banned-term",
  definition: "one term akasha writes another term in place of",
  parts: [
    "record-property/replacement-patterns",
    "relation-property/prose-frame",
    "text-property/from-pattern",
    "text-property/instead",
    "text-property/to-pattern",
  ],
  extends: ["page-type/term"],
  properties: [
    { pageProperty: "text-property/instead", required: true, many: false },
    {
      pageProperty: "record-property/replacement-patterns",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A banned term names the term akasha writes in its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One word banned in two senses is two pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sense this page does not name is a sense akasha still writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sense an agent alone can tell apart names no pattern here.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
