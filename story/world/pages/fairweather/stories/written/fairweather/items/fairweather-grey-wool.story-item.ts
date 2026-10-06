import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherGreyWool = {
  id: "01a11186-d829-71e5-8026-95adcd6acdd6",
  type: "page-type/story-item",
  slug: "fairweather-grey-wool",
  title: "Grey Wool",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description: "A skein of soft wool dyed a cool pale grey.",
} as const satisfies StoryItem
