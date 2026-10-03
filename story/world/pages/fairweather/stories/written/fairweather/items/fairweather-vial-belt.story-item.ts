import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherVialBelt = {
  id: "01a10326-1ad8-76d6-ae24-5d2703975212",
  type: "page-type/story-item",
  slug: "fairweather-vial-belt",
  title: "Belt of Corked Vials",
  story: "story-written/fairweather",
  character: "character-other/fairweather-tilly",
  description:
    "A leather belt of loops and little pouches holding a dozen corked vials of Tilly's brews, three of them bang vials.",
} as const satisfies StoryItem
