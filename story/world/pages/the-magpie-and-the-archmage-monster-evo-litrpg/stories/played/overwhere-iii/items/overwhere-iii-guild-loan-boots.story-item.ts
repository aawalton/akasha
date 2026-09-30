import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiGuildLoanBoots = {
  id: "01a0f20b-e06e-7644-9e3b-87aa8992b5b2",
  type: "page-type/story-item",
  slug: "overwhere-iii-guild-loan-boots",
  title: "Worn Boots",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  slot: "item-slot/feet",
  description: "Old leather boots from the Guild post's gear box, lent by Marda like the knife.",
} as const satisfies StoryItem
