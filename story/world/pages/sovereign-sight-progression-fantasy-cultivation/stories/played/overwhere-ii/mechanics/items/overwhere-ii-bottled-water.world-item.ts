import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const overwhereIiBottledWater = {
  id: "01a0fdd2-fb75-74af-9817-9f6ed4fbca9d",
  type: "page-type/world-item",
  slug: "overwhere-ii-bottled-water",
  title: "Bottled Water",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  description:
    "A small stoppered bottle of cold, dense Water drawn out of a Talent, a draught's worth.",
} as const satisfies WorldItem
