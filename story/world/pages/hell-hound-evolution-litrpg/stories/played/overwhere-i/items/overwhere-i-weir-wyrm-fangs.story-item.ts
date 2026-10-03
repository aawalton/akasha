import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIWeirWyrmFangs = {
  id: "01a101c5-e257-7856-8bd7-92da6f6106fc",
  type: "page-type/story-item",
  slug: "overwhere-i-weir-wyrm-fangs",
  title: "Weir Wyrm's Fangs",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description:
    "The Weir Wyrm's two hooked, yellow-white fangs, each a hand long, wrapped in her pack.",
} as const satisfies StoryItem
