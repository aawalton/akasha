import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaAnnisBoots = {
  id: "01a0f1b7-8442-7fa9-aa3c-7323f60c96f7",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-annis-boots",
  title: "Anni's Boots",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  slot: "item-slot/feet",
  description: "A pair of worn brown leather boots, laced to the shin, a little large for her.",
} as const satisfies StoryItem
