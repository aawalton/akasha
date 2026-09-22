import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerReclaimedDenMetal = {
  id: "01a0ca53-0e6f-7247-9bc0-2d78dba3d674",
  type: "page-type/item",
  slug: "the-tower-reclaimed-den-metal",
  title: "Reclaimed den-metal (forge-stock)",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  description:
    "A double handful of fire-cleaned scrap: belt-buckles, a pitted eating-knife, nails, an iron clasp.\n",
} as const satisfies Item
