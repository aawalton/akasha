import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaSlimeCores = {
  id: "01a0f1ce-3788-7a23-ad6a-bc76196a6d01",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-slime-cores",
  title: "Slime Cores",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  quantity: 47,
  description: "Dull grey slime cores clinking in her pockets, 3 copper each at the hall.",
} as const satisfies StoryItem
