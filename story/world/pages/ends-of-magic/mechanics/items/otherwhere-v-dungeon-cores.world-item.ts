import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereVDungeonCores = {
  id: "01a0e9fb-c0e7-7a92-b9b6-de78a69ea8ee",
  type: "page-type/world-item",
  slug: "otherwhere-v-dungeon-cores",
  title: "Dungeon Cores",
  world: "world/ends-of-magic",
  aliases: ["dungeon core"],
  description: "The magical heart of a dungeon.",
} as const satisfies WorldItem
