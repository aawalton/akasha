import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerWovenLightMantle = {
  id: "01a0ca53-2d6e-7aa0-962c-4c2bc8bc2311",
  type: "page-type/item",
  slug: "the-tower-woven-light-mantle",
  title: "Woven-light mantle",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  description:
    "A mantle of woven brightness gone slack and grey, shed in one piece and weightless.",
} as const satisfies Item
