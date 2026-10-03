import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildBokoBow = {
  id: "01a10332-e999-72c7-b2ba-fcc6f7d75229",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-boko-bow",
  title: "Boko Bow",
  story: "story-written/breath-of-the-wild",
  character: "character-other/breath-of-the-wild-link",
  description: "A crude bokoblin bow, with a quiver of rough-shafted, stone-tipped arrows.",
} as const satisfies StoryItem
