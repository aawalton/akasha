import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildTravelersSword = {
  id: "01a10332-e99a-7cdd-9196-b4a117a36a8c",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-travelers-sword",
  title: "Traveler's Sword",
  story: "story-written/breath-of-the-wild",
  character: "character-other/breath-of-the-wild-link",
  description: "A short, simply made traveler's sword with five attack and a leather-wrapped hilt.",
  category: "weapon",
  createdAt: "2026-10-03T19:17:10.682Z",
  updatedAt: "2026-10-27T18:59:22.828Z",
} as const satisfies StoryItem
