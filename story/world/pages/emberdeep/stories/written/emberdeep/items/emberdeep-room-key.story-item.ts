import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const emberdeepRoomKey = {
  id: "01a0fde6-9f8a-784b-9bb2-2120bbc4ddf1",
  type: "page-type/story-item",
  slug: "emberdeep-room-key",
  title: "Room Key",
  story: "story-written/emberdeep",
  character: "character-player/emberdeep-nala",
  description: "An iron key to room 7 at Corbel House, on a leather tag burned with the number 7.",
} as const satisfies StoryItem
