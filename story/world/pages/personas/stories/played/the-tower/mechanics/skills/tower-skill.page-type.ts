import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerSkill = {
  id: "01a0de18-0b70-753b-98c7-6ffd7532c175",
  type: "page-type/page-type",
  slug: "tower-skill",
  definition: "one character's learned ability in the Tower",
  pluralSlug: "skills",
  extends: ["page-type/skill"],
  parts: [
    "relation-property/rank-of-tower-skill",
    "number-property/tower-skill-level",
    "number-property/tower-skill-demonstrations",
    "text-property/tower-skill-axis",
    "relation-property/tower-skill-element",
    "page-type/tower-skill-rank",
    "module/tower-skill-advance",
    "module/tower-skill-bonus",
  ],
  properties: [
    { pageProperty: "relation-property/rank-of-tower-skill", required: true, many: false },
    { pageProperty: "number-property/tower-skill-level", required: true, many: false },
    { pageProperty: "number-property/tower-skill-demonstrations", required: true, many: false },
    { pageProperty: "text-property/tower-skill-axis", required: false, many: false },
    { pageProperty: "relation-property/tower-skill-element", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's rank is judged against the line its rank page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a skill adds to that line is only its axis.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
