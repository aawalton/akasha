import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherAdventurersOutfit = {
  id: "01a102af-305c-76c7-afa8-d5a20aa37ad0",
  type: "page-type/story-item",
  slug: "fairweather-adventurers-outfit",
  title: "Novice Adventurer's Outfit",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description:
    "A cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, fingerless leather gloves and tall soft leather boots.",
} as const satisfies StoryItem
