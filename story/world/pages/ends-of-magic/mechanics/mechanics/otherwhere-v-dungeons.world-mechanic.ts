import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVDungeons = {
  id: "01a0e9fb-325a-7f2a-bb99-3e35fe7e8c57",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-dungeons",
  title: "Dungeons",
  world: "world/ends-of-magic",
  aliases: ["dungeon"],
  description: "Magical strongholds of monsters and traps that must be delved and cleared.",
} as const satisfies WorldMechanic
