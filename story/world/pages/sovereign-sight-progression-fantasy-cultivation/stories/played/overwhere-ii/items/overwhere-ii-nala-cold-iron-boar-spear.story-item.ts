import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaColdIronBoarSpear = {
  id: "01a0fd33-cb15-73bd-b870-7789abf478e3",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-cold-iron-boar-spear",
  title: "Cold-Iron Boar Spear",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  slot: "item-slot/main-hand",
  description:
    "A long ash boar spear whose dark, dull cold-iron head has a crossbar below the blade.",
} as const satisfies StoryItem
