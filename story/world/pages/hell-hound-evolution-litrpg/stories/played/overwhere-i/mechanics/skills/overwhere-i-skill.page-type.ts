import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereISkill = {
  id: "01a0ed15-c07a-7af3-800b-dd692b3a0334",
  type: "page-type/page-type",
  slug: "overwhere-i-skill",
  definition: "one skill a character in Overwhere I holds, at the level it has reached",
  pluralSlug: "skills",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/overwhere-i-skill-character",
    "relation-property/overwhere-i-skill-skill",
    "number-property/overwhere-i-skill-level",
  ],
  properties: [
    { pageProperty: "relation-property/overwhere-i-skill-character", required: true, many: false },
    { pageProperty: "relation-property/overwhere-i-skill-skill", required: true, many: false },
    { pageProperty: "number-property/overwhere-i-skill-level", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is filed as a skill of the world before any turn grants it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding names the character, the world's skill and the level reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill starts at level one; the growth check raises it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
