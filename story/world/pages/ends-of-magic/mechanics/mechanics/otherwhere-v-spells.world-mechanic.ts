import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVSpells = {
  id: "01a0e9f3-d4d0-7d07-a995-fd935dfdbb79",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-spells",
  title: "Named Spells",
  world: "world/ends-of-magic",
  aliases: ["spells"],
  description: "The particular spells mages know by name, such as Teleport and Disintegrate.",
} as const satisfies WorldMechanic
