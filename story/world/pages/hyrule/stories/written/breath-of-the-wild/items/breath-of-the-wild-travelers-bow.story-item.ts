import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildTravelersBow = {
  id: "01a10332-e99a-7b3a-8687-6f95266356ff",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-travelers-bow",
  title: "Traveler's Bow",
  story: "story-written/breath-of-the-wild",
  character: "character-other/breath-of-the-wild-link",
  description: "A simple bow of wood and cord, with a quiver of ten or twelve arrows.",
} as const satisfies StoryItem
