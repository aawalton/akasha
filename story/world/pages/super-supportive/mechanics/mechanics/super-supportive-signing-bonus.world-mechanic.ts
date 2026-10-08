import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSigningBonus = {
  id: "01a0e9f0-3dfb-7743-8501-f79bd2a337d5",
  type: "page-type/world-mechanic",
  slug: "super-supportive-signing-bonus",
  title: "Signing bonus",
  world: "world/super-supportive",
  aliases: ["signing gift", "an additional gift"],
  description: "The extra gift a selectee receives for signing the Contract.",
  createdAt: "2026-09-28T21:33:50.971Z",
  updatedAt: "2026-09-28T21:33:54.000Z",
} as const satisfies WorldMechanic
