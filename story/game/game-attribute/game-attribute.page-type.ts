import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gameAttribute = {
  id: "01a0c489-28b0-7100-a172-6999668e415c",
  type: "page-type/page-type",
  slug: "game-attribute",
  definition: "a number a character has, which a mechanic reads off that character's sheet",
  extends: ["page-type/page"],
  parts: ["number-property/least", "number-property/most"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/least", required: true, many: false },
    { pageProperty: "number-property/most", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute says the least and the most a character's value may be.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanic reads an attribute off the sheet by that attribute's slug.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No attribute holds any character's own value.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
