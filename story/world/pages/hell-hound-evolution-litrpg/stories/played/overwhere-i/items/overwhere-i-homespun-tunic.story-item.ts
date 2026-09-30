import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIHomespunTunic = {
  id: "01a0f1c0-467e-7007-9d5a-c296d5378762",
  type: "page-type/story-item",
  slug: "overwhere-i-homespun-tunic",
  title: "Homespun Tunic",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description: "A long-sleeved tunic of undyed homespun wool, belted at the waist.",
} as const satisfies StoryItem
