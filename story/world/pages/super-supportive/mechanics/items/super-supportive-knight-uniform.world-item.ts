import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveKnightUniform = {
  id: "01a0e9f9-7733-7c2b-b38e-1e17cde3903f",
  type: "page-type/world-item",
  slug: "super-supportive-knight-uniform",
  title: "Knight uniform",
  world: "world/super-supportive",
  aliases: ["knight coat"],
  description: "An enchanted coat worn by knights.",
  createdAt: "2026-09-28T21:43:55.443Z",
  updatedAt: "2026-09-28T21:44:00.000Z",
} as const satisfies WorldItem
