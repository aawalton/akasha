import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const recipeCollection = {
  id: "01a06807-be66-7010-8d4a-7caba22196b6",
  type: "page-type/page-type",
  slug: "recipe-collection",
  definition: "a collection of recipes Alan keeps",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-10-30T15:09:57.526Z",
} as const satisfies PageType
