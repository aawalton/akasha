import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveMutableHaft = {
  id: "01a0e9f8-6bb3-7aed-b798-daa44be950b9",
  type: "page-type/world-item",
  slug: "super-supportive-mutable-haft",
  title: "Mutable Haft",
  world: "world/super-supportive",
  aliases: ["Marsha's polearm"],
  description: "A polearm with an engraved bone haft and a shape-changing blade.",
} as const satisfies WorldItem
