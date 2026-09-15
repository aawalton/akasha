import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const achievement = {
  id: "01a06807-be66-7009-aef9-4834eb342f4f",
  type: "page-type",
  slug: "achievement",
  definition: "a mark a game gives for finishing something in it",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
