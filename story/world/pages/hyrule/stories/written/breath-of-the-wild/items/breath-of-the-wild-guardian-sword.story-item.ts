import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildGuardianSword = {
  id: "01a10332-e99a-7404-b472-6f586f8df35b",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-guardian-sword",
  title: "Guardian Sword",
  story: "story-written/breath-of-the-wild",
  character: "character-other/breath-of-the-wild-link",
  description: "A light, humming blade of blue-white Sheikah metal with twenty attack.",
} as const satisfies StoryItem
