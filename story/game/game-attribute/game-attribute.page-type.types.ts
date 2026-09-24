import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Least } from "akasha/story/game/game-attribute/properties/least.number-property.types.ts"
import type { Most } from "akasha/story/game/game-attribute/properties/most.number-property.types.ts"

export type GameAttribute = Page & {
  title: Title
  least: Least
  most: Most
}
