import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildWoodcuttersAxe = {
  id: "01a10332-e99a-7fc0-930e-116ba7ad14fe",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-woodcutters-axe",
  title: "Woodcutter's Axe",
  story: "story-written/breath-of-the-wild",
  character: "character-other/breath-of-the-wild-link",
  description: "A heavy wood-chopping axe, a tool rather than a weapon.",
} as const satisfies StoryItem
