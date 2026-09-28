import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveKnightUniform = {
  id: "01a0e9f9-7733-7c2b-b38e-1e17cde3903f",
  type: "page-type/world-item",
  slug: "super-supportive-knight-uniform",
  title: "Knight uniform",
  world: "world/super-supportive",
  aliases: ["knight coat"],
  description: "An enchanted coat worn by knights.",
} as const satisfies WorldItem
