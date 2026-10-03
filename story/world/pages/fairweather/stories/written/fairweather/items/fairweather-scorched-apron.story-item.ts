import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherScorchedApron = {
  id: "01a10365-f8f3-7cfa-9a60-df1bfd98f1b9",
  type: "page-type/story-item",
  slug: "fairweather-scorched-apron",
  title: "Scorched Apron",
  story: "story-written/fairweather",
  character: "character-other/fairweather-tilly",
  description: "A scorched work apron several sizes too big.",
} as const satisfies StoryItem
