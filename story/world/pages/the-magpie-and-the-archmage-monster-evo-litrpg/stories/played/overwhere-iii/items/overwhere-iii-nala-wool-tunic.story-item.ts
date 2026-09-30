import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiNalaWoolTunic = {
  id: "01a0f39f-88d2-746f-a4a1-f8b2baca9afd",
  type: "page-type/story-item",
  slug: "overwhere-iii-nala-wool-tunic",
  title: "Wool Tunic",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  slot: "item-slot/body",
  description:
    "A plain brown wool tunic from Bet's box, worn over the gray shirt, darned at one elbow.",
} as const satisfies StoryItem
