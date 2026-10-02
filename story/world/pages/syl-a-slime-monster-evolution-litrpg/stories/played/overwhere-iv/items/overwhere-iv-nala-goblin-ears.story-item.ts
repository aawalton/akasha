import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaGoblinEars = {
  id: "01a0fd71-8452-7ea3-8be8-f322bc1f725d",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-goblin-ears",
  title: "Goblin Ears",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  quantity: 7,
  description: "Pointed green ears, the guild's proof of a goblin slain.",
} as const satisfies StoryItem
