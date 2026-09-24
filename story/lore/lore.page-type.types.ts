import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { LoreAbout } from "akasha/story/lore/properties/lore-about.relation-property.types.ts"
import type { LoreDisclosure } from "akasha/story/lore/properties/lore-disclosure.relation-property.types.ts"
import type { LoreFacts } from "akasha/story/lore/properties/lore-facts.text-property.types.ts"
import type { World } from "akasha/story/world/stories/played/properties/world.relation-property.types.ts"

export type Lore = Page & {
  title: Title
  world: World
  about?: LoreAbout
  loreDisclosure: LoreDisclosure
  facts?: LoreFacts
}
