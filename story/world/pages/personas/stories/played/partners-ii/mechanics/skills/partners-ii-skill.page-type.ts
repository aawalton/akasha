import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiSkill = {
  id: "01a0de4b-431d-77e3-bc72-3808b4aa1839",
  type: "page-type/page-type",
  slug: "partners-ii-skill",
  definition: "one character's learned ability in Partners II",
  pluralSlug: "skills",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/partners-ii-skill-character",
    "relation-property/partners-ii-skill-skill",
    "number-property/partners-ii-skill-rank",
  ],
  properties: [
    { pageProperty: "relation-property/partners-ii-skill-character", required: true, many: false },
    { pageProperty: "relation-property/partners-ii-skill-skill", required: true, many: false },
    { pageProperty: "number-property/partners-ii-skill-rank", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
