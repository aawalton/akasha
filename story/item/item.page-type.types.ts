import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ItemCharacter } from "akasha/story/item/properties/item-character.relation-property.types.ts"
import type { ItemEssence } from "akasha/story/item/properties/item-essence.relation-property.types.ts"
import type { ItemSlot } from "akasha/story/item/properties/item-slot.relation-property.types.ts"
import type { ItemStory } from "akasha/story/item/properties/item-story.relation-property.types.ts"

export type Item = Page & {
  title: Title
  story: ItemStory
  character: ItemCharacter
  slot?: ItemSlot
  essence?: ItemEssence
}
