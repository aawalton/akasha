import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildWarmDoublet = {
  id: "01a10332-e99a-7418-8c68-55a07399bf44",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-warm-doublet",
  title: "Warm Doublet",
  story: "story-written/breath-of-the-wild",
  character: "character-other/breath-of-the-wild-link",
  description: "A dark blue quilted doublet lined with something soft, that holds back the cold.",
} as const satisfies StoryItem
