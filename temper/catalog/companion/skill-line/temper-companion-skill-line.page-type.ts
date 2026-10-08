import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionSkillLine = {
  id: "01a05fce-1854-7d72-872a-0e22ce5c84c5",
  type: "page-type/page-type",
  slug: "temper-companion-skill-line",
  definition: "a group of companion abilities learned together",
  extends: ["page-type/temper-companion-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/category", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:48:57.300Z",
  updatedAt: "2026-09-22T19:24:31.000Z",
} as const satisfies PageType
