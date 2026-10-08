import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVSpells = {
  id: "01a0e9f3-d4d0-7d07-a995-fd935dfdbb79",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-spells",
  title: "Named Spells",
  world: "world/ends-of-magic",
  aliases: ["spells"],
  description: "Particular spells known by name.",
  createdAt: "2026-09-28T21:37:46.192Z",
  updatedAt: "2026-09-28T21:48:29.000Z",
} as const satisfies WorldMechanic
