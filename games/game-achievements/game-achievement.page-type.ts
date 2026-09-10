import type { PageType } from "@akasha/pages/page-type"

export const gameAchievement = {
  id: "01a06807-be66-7009-aef9-4834eb342f4f",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "game-achievement",
  definition: "a mark a game gives for finishing something in it",
  pluralSlug: "game-achievements",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
