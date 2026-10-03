import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIIlseClaimTag = {
  id: "01a0ff76-6f94-7fb2-854b-f4544300b479",
  type: "page-type/story-item",
  slug: "overwhere-i-ilse-claim-tag",
  title: "Ilse's claim tag",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description: "A stamped tin tag from Ilse Varrow's shop, to claim Nala's two-pearl ring.",
} as const satisfies StoryItem
