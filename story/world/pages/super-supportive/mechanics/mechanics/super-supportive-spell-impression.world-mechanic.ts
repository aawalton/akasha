import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSpellImpression = {
  id: "01a0e9f1-065f-7335-a1e2-ee9b8381c58a",
  type: "page-type/world-mechanic",
  slug: "super-supportive-spell-impression",
  title: "Spell impression",
  world: "world/super-supportive",
  aliases: ["spell impressions", "spell slot"],
  description:
    "A perfect copy of a real spell impressed into an Avowed so their body casts it correctly on autopilot.",
  createdAt: "2026-09-28T21:34:42.271Z",
  updatedAt: "2026-09-28T21:34:45.000Z",
} as const satisfies WorldMechanic
