import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherBirthdayNotebook = {
  id: "01a102af-305c-73d3-9b30-fb0c94e03532",
  type: "page-type/story-item",
  slug: "fairweather-birthday-notebook",
  title: "Birthday Notebook",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description:
    "A small cloth-bound notebook with a pencil tucked in its spine, its pages ruled for names, birthdays and favourite things.",
} as const satisfies StoryItem
