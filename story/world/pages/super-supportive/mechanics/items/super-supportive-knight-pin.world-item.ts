import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveKnightPin = {
  id: "01a0e9f9-7732-7b91-8d8c-751a2302ab0b",
  type: "page-type/world-item",
  slug: "super-supportive-knight-pin",
  title: "Knight's pin",
  world: "world/super-supportive",
  aliases: ["wooden pins"],
  description: "A wooden shoulder pin carved with a knight's skill symbol.",
} as const satisfies WorldItem
