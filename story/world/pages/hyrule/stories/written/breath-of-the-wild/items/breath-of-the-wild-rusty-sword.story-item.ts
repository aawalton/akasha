import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildRustySword = {
  id: "01a10332-e99a-754e-bcd6-824864e30a12",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-rusty-sword",
  title: "Rusty Sword",
  story: "story-written/breath-of-the-wild",
  character: "character-other/breath-of-the-wild-link",
  description: "A corroded, weak sword found half-buried in the dirt.",
} as const satisfies StoryItem
