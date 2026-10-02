import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereICrowCrossbow = {
  id: "01a0fe5d-f836-7e2c-a0d0-3414641cc496",
  type: "page-type/story-item",
  slug: "overwhere-i-crow-crossbow",
  title: "Crow's Crossbow",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description:
    "A fine cranked crossbow, better made than any other the crew carried, taken from Crow.",
} as const satisfies StoryItem
