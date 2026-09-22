import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSkillLineCategory = {
  id: "01a05fca-cb8b-713e-b910-7148de1f3dbd",
  type: "page-type/page-type",
  slug: "temper-skill-line-category",
  definition: "a group gathering the skill lines",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
