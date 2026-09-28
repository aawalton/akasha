import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSigningBonus = {
  id: "01a0e9f0-3dfb-7743-8501-f79bd2a337d5",
  type: "page-type/world-mechanic",
  slug: "super-supportive-signing-bonus",
  title: "Signing bonus",
  world: "world/super-supportive",
  aliases: ["signing gift", "an additional gift"],
  description: "The extra gift a selectee receives for signing the Contract.",
} as const satisfies WorldMechanic
