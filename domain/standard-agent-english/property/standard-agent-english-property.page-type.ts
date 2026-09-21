import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const standardAgentEnglishProperty = {
  id: "01a07c99-fb58-79b6-a204-a2bf1f056902",
  type: "page-type/page-type",
  slug: "standard-agent-english-property",
  definition: "a text property whose value Standard Agent English judges",
  extends: ["page-type/text-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property of this page type has a value read as English.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property whose page type extends this page type is judged the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property of any other page type is not judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property is moved to this page type rather than named in a list.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
  properties: [{ pageProperty: "relation-property/start-symbol", required: false, many: false }],
  parts: ["relation-property/start-symbol"],
} as const satisfies PageType
