import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveDuelingRings = {
  id: "01a0e9fc-0700-795b-9790-cdb8b21429f0",
  type: "page-type/world-item",
  slug: "super-supportive-dueling-rings",
  title: "Dueling rings",
  world: "world/super-supportive",
  description: "Training rings that put random flaws into the wearer's spells.",
} as const satisfies WorldItem
