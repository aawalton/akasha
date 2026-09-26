import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const rolls = {
  id: "01a0de23-015c-7892-8e17-ce5f54c5a9bc",
  type: "page-type/file-property",
  slug: "rolls",
  propertySlug: "rolls",
  definition: "the rolls settled on a played turn, one to a line",
  extensions: ["jsonl"],
  appendOnly: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one roll a check settled, as one json object.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line states the check, its reading, the dice, the seed and the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roll is kept on the turn the roll settled.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
