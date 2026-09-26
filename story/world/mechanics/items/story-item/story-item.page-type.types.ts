import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ItemCharacter } from "akasha/story/world/mechanics/items/story-item/properties/item-character.relation-property.types.ts"
import type { ItemEssence } from "akasha/story/world/mechanics/items/story-item/properties/item-essence.relation-property.types.ts"
import type { ItemPlace } from "akasha/story/world/mechanics/items/story-item/properties/item-place.relation-property.types.ts"
import type { ItemSlot } from "akasha/story/world/mechanics/items/story-item/properties/item-slot.relation-property.types.ts"
import type { ItemStory } from "akasha/story/world/mechanics/items/story-item/properties/item-story.relation-property.types.ts"
import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export type StoryItem = WorldItem & {
  title: Title
  story: ItemStory
  character?: ItemCharacter
  place?: ItemPlace
  slot?: ItemSlot
  essence?: ItemEssence
}
