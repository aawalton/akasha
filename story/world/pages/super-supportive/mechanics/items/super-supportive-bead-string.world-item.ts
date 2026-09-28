import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveBeadString = {
  id: "01a0e9fc-0700-7a07-8b35-4b2723983f14",
  type: "page-type/world-item",
  slug: "super-supportive-bead-string",
  title: "White bead string",
  world: "world/super-supportive",
  aliases: ["magic detector"],
  description: "A short string of white beads that detects what kind of magic is happening nearby.",
} as const satisfies WorldItem
