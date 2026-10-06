import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherBlueShawl = {
  id: "01a11365-72ca-7578-a12d-d13ed72a54a7",
  type: "page-type/story-item",
  slug: "fairweather-blue-shawl",
  title: "Blue Shawl",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description: "A soft old shawl of faded blue, with no sleeves, tied in front.",
} as const satisfies StoryItem
