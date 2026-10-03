import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildBokoClub = {
  id: "01a10332-e999-7bfe-bcb0-83961039a995",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-boko-club",
  title: "Boko Club",
  story: "story-written/breath-of-the-wild",
  place: "place/hyrule-great-plateau",
  description: "A crude club of thick, knotted bone with four attack, good for about twelve hits.",
} as const satisfies StoryItem
