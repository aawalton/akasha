import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherMargery = {
  id: "01a10365-f8f3-710b-ac1d-925d568e3f7c",
  type: "page-type/story-item",
  slug: "fairweather-margery",
  title: "Margery",
  story: "story-written/fairweather",
  character: "character-other/fairweather-tamsin",
  description:
    "Tamsin's great axe, carried strapped across her back with its head wrapped in sacking.",
} as const satisfies StoryItem
