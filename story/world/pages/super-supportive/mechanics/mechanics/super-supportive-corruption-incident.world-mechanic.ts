import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveCorruptionIncident = {
  id: "01a0e9f1-cfc2-729c-aebf-8cfdbef98f19",
  type: "page-type/world-mechanic",
  slug: "super-supportive-corruption-incident",
  title: "Corruption incident",
  world: "world/super-supportive",
  aliases: ["chaos outbreak", "Thegund Class corrupted environment"],
  description:
    "An outbreak where chaos rises in an area, spreading demons and destroying life and objects.",
  createdAt: "2026-09-28T21:35:33.826Z",
  updatedAt: "2026-09-28T21:35:36.000Z",
} as const satisfies WorldMechanic
