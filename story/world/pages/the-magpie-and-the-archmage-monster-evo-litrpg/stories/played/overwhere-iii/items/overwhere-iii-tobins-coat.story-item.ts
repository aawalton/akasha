import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiTobinsCoat = {
  id: "01a0f1b9-8735-7751-bb77-6ad25ff14beb",
  type: "page-type/story-item",
  slug: "overwhere-iii-tobins-coat",
  title: "Tobin's Coat",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  slot: "item-slot/body",
  description: "A heavy carter's coat, far too big for her, that smells of apples.",
} as const satisfies StoryItem
