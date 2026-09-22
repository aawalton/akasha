import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSkillLine = {
  id: "01a05fca-cb8b-7189-8133-38b9f311342c",
  type: "page-type/page-type",
  slug: "temper-skill-line",
  definition: "a track of skills a character raises together",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/eso-skill-line-id",
    "number-property/max-rank",
    "relation-property/skill-line-class",
    "relation-property/skill-line-category",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "number-property/eso-skill-line-id", required: true, many: false },
    { pageProperty: "number-property/max-rank", required: true, many: false },
    { pageProperty: "relation-property/skill-line-class", required: false, many: false },
    { pageProperty: "relation-property/skill-line-category", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
