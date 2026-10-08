import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVEmerald = {
  id: "01a0e9fa-40da-796f-b478-a10255b63353",
  type: "page-type/lore",
  slug: "otherwhere-v-emerald",
  title: "Emerald",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-emerald",
  facts: [
    {
      fact: "Emerald is a scout of Vhala's Gemore team, fully helmed, with porcelain-white skin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Emerald wears a dark breastplate and chain and fights with a rapier and cleaver.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Emerald scouts Taeol's tower west of Giantsrest with Vhala, Artha and Wiam.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:44:47.066Z",
  updatedAt: "2026-09-28T21:44:53.000Z",
} as const satisfies Lore
