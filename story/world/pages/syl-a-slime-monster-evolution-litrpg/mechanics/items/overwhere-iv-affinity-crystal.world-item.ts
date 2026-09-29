import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const overwhereIvAffinityCrystal = {
  id: "01a0ed31-f1d9-7f69-8187-4c66c491177e",
  type: "page-type/world-item",
  slug: "overwhere-iv-affinity-crystal",
  title: "Affinity Crystal",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "A crystal that glows in the colours of the elements whoever touches it leans toward.",
} as const satisfies WorldItem
