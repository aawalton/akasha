import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"

export type GameAchievement = CollectionExternal & {
  title: Title
}

export const gameAchievement = {
  id: "01a06807-be66-7009-aef9-4834eb342f4f",
  pageTypeSlug: "page-type",
  slug: "game-achievement",
  definition: "a mark a game gives for finishing something in it",
  pluralSlug: "game-achievements",
  extendsSlug: "page-type/collection-external",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
