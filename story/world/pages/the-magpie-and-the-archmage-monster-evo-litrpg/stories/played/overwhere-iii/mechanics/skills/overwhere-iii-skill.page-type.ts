import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiSkill = {
  id: "01a0ed2d-2c5c-78f6-9786-69d8cab391e1",
  type: "page-type/page-type",
  slug: "overwhere-iii-skill",
  definition: "one skill a character in Overwhere III holds, at the skill level it has reached",
  pluralSlug: "skills",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/overwhere-iii-skill-character",
    "relation-property/overwhere-iii-skill-skill",
    "number-property/overwhere-iii-skill-level",
  ],
  properties: [
    {
      pageProperty: "relation-property/overwhere-iii-skill-character",
      required: true,
      many: false,
    },
    { pageProperty: "relation-property/overwhere-iii-skill-skill", required: true, many: false },
    { pageProperty: "number-property/overwhere-iii-skill-level", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is filed as a skill of the world before any turn grants it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding names the character, the world's skill and the skill level reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Skill levels run Basic, Novice, Adept, Expert and Legend, held as one to five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill comes by use against a real foe or need, by the skill shop, or by combining.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill rises a level after five telling uses times the level it is leaving.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A human holds at most ten skills; a new one past that replaces an old one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The System names a new skill as `[New skill acquired – Name.]` and describes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
