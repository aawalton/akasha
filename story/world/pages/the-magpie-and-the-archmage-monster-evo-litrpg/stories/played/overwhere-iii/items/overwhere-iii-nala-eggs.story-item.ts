import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiNalaEggs = {
  id: "01a0fe2e-6f79-7b3f-9d48-9bd1eaee4b50",
  type: "page-type/story-item",
  slug: "overwhere-iii-nala-eggs",
  title: "Eggs",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  quantity: 12,
  description: "Brown hen's eggs, raw, wrapped in a knotted cloth.",
} as const satisfies StoryItem
