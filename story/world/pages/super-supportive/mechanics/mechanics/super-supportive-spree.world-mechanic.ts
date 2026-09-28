import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSpree = {
  id: "01a0e9f2-f0a2-7b01-979f-c52d32844ac6",
  type: "page-type/world-mechanic",
  slug: "super-supportive-spree",
  title: "The Spree",
  world: "world/super-supportive",
  aliases: ["Spree day"],
  description: "A Rabbit event of stylish shopping in October.",
} as const satisfies WorldMechanic
