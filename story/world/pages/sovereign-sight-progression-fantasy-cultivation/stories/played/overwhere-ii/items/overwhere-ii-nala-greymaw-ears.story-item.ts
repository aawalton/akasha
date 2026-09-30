import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaGreymawEars = {
  id: "01a0f3ce-fc91-7191-a1d2-87dd0fe263f2",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-greymaw-ears",
  title: "Greymaw Ear",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  description: "A severed ear, furred and grey-scaled, reeking of rotten salt.",
  quantity: 1,
} as const satisfies StoryItem
