import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiNalaHoodedCloak = {
  id: "01a0f39f-88cd-7c13-b121-2f3e473d596a",
  type: "page-type/story-item",
  slug: "overwhere-iii-nala-hooded-cloak",
  title: "Gray Hooded Cloak",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  slot: "item-slot/shoulders",
  description: "A heavy gray wool cloak with a deep hood, bought from Bet's box for five copper.",
} as const satisfies StoryItem
