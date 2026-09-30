import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiNalaCopperGuildRing = {
  id: "01a0f201-03b7-77e4-84cc-b4639ed3e6d9",
  type: "page-type/story-item",
  slug: "overwhere-iii-nala-copper-guild-ring",
  title: "Copper Guild Ring",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  description:
    "A plain copper ring Marda gave her for her first finished job. It will size to her.",
} as const satisfies StoryItem
