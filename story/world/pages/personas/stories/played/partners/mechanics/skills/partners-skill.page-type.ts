import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersSkill = {
  id: "01a0de4a-ee32-79c2-bd70-f88d3148c4f3",
  type: "page-type/page-type",
  slug: "partners-skill",
  definition: "one character's learned ability in Partners",
  pluralSlug: "skills",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/partners-skill-character",
    "relation-property/partners-skill-skill",
    "number-property/partners-skill-rank",
    "number-property/partners-skill-uses",
  ],
  properties: [
    { pageProperty: "relation-property/partners-skill-character", required: true, many: false },
    { pageProperty: "relation-property/partners-skill-skill", required: true, many: false },
    { pageProperty: "number-property/partners-skill-rank", required: false, many: false },
    { pageProperty: "number-property/partners-skill-uses", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
