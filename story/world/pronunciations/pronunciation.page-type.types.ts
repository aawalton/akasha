import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { World } from "akasha/story/world/stories/played/properties/world.relation-property.types.ts"

export type Pronunciation = Page & {
  title: Title
  world: World
}
