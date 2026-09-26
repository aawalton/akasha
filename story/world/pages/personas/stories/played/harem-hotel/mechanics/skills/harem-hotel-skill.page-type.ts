import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelSkill = {
  id: "01a0de53-3409-79d9-8457-9d788aab3b6b",
  type: "page-type/page-type",
  slug: "harem-hotel-skill",
  definition: "one character's learned ability in the Harem Hotel",
  pluralSlug: "skills",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/harem-hotel-skill-character",
    "relation-property/harem-hotel-skill-skill",
    "relation-property/rank-of-harem-hotel-skill",
    "number-property/harem-hotel-skill-level",
    "number-property/harem-hotel-skill-demonstrations",
    "page-type/harem-hotel-skill-rank",
  ],
  properties: [
    { pageProperty: "relation-property/harem-hotel-skill-character", required: true, many: false },
    { pageProperty: "relation-property/harem-hotel-skill-skill", required: true, many: false },
    { pageProperty: "relation-property/rank-of-harem-hotel-skill", required: true, many: false },
    { pageProperty: "number-property/harem-hotel-skill-level", required: true, many: false },
    {
      pageProperty: "number-property/harem-hotel-skill-demonstrations",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's rank is judged against the line its rank page states.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
