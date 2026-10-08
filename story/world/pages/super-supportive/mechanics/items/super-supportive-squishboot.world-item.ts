import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveSquishboot = {
  id: "01a0e9f8-6bb4-7bdf-982f-446f7ad13c7e",
  type: "page-type/world-item",
  slug: "super-supportive-squishboot",
  title: "squishboot",
  world: "world/super-supportive",
  aliases: ["dynamic gel cast"],
  description: "A gel cast boot for a healing foot that lets the wearer put weight on it.",
  createdAt: "2026-09-28T21:42:46.964Z",
  updatedAt: "2026-09-28T21:42:50.000Z",
} as const satisfies WorldItem
