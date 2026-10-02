import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIvSkill = {
  id: "01a0ed1b-1aec-7cc5-b168-ec7265608cd4",
  type: "page-type/page-type",
  slug: "overwhere-iv-skill",
  definition: "one skill or trait a character in Overwhere IV holds, at the level it has reached",
  pluralSlug: "skills",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/overwhere-iv-skill-character",
    "relation-property/overwhere-iv-skill-skill",
    "number-property/overwhere-iv-skill-level",
    "number-property/overwhere-iv-skill-reach-paces",
    "number-property/overwhere-iv-skill-uses",
  ],
  properties: [
    { pageProperty: "relation-property/overwhere-iv-skill-character", required: true, many: false },
    { pageProperty: "relation-property/overwhere-iv-skill-skill", required: true, many: false },
    { pageProperty: "number-property/overwhere-iv-skill-level", required: true, many: false },
    {
      pageProperty: "number-property/overwhere-iv-skill-reach-paces",
      required: false,
      many: false,
    },
    { pageProperty: "number-property/overwhere-iv-skill-uses", required: false, many: false },
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
      statement:
        "A skill held starts at level one and reaches LV MAX at ten; the growth check raises it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding at level zero is a skill she lacks, carrying uses toward level one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding at level zero is unrevealed while she has not been shown the skill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding's uses are the earnest uses carried toward its next level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding's reach is how far from her the skill works, in paces.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
