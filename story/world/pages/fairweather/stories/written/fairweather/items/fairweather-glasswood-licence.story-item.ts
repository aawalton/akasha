import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherGlasswoodLicence = {
  id: "01a10377-b8d6-70d6-b678-c7b8f2fac5bd",
  type: "page-type/story-item",
  slug: "fairweather-glasswood-licence",
  title: "Glasswood Licence",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description:
    "A guild paper stamped twice at the east gate booth, licensing Elsie Fairweather, Tamsin Reyes and Ottilie Brandt into the Glasswood's edge for one night.",
} as const satisfies StoryItem
