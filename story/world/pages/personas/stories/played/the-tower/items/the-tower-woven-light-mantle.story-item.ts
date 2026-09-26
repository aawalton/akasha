import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerWovenLightMantle = {
  id: "01a0ca53-2d6e-7aa0-962c-4c2bc8bc2311",
  type: "page-type/story-item",
  slug: "the-tower-woven-light-mantle",
  title: "Woven-light mantle",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  description:
    "A mantle of woven brightness gone slack and grey, shed in one piece and weightless.",
} as const satisfies StoryItem
