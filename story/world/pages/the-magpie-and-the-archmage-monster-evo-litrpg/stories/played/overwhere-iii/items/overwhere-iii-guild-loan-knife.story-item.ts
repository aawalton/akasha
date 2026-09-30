import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiGuildLoanKnife = {
  id: "01a0f1bd-f510-7637-95a0-aa8ab3afe5e7",
  type: "page-type/story-item",
  slug: "overwhere-iii-guild-loan-knife",
  title: "Plain Knife",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  slot: "item-slot/waist",
  description: "A plain knife in a worn sheath, lent by the Guild post and owed back.",
} as const satisfies StoryItem
