import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaCowHorn = {
  id: "01a0fe7c-693a-7fe0-aefa-f05fb28d659f",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-cow-horn",
  title: "Cow Horn",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  description: "A hollowed cow horn for blowing an alarm, lent by the hall for the night watch.",
} as const satisfies StoryItem
