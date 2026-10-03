import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaGoblinEars = {
  id: "01a10184-968b-75ba-999d-5be1caddc7ee",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-goblin-ears",
  title: "Goblin Ears",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  quantity: 6,
  description: "Left ears of goblins, bagged as proof for the hall's bounty.",
} as const satisfies StoryItem
