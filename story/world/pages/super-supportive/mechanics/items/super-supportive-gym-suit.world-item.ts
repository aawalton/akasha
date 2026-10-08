import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveGymSuit = {
  id: "01a0e9f4-be67-7611-9dfa-84a3ee0bf631",
  type: "page-type/world-item",
  slug: "super-supportive-gym-suit",
  title: "Gym suit",
  world: "world/super-supportive",
  aliases: ["protective bodysuit", "unitard"],
  description: "A gray self-sealing suit with red bands worn in the MagiPhys Gym.",
  createdAt: "2026-09-28T21:38:45.991Z",
  updatedAt: "2026-09-28T21:38:49.000Z",
} as const satisfies WorldItem
