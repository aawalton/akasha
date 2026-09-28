import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVHealingMagic = {
  id: "01a0ea01-9176-7fbd-99a6-28f2d4fba386",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-healing-magic",
  title: "Healing Magic",
  world: "world/ends-of-magic",
  aliases: ["curing"],
  description: "Magic of mending wounds and bodies.",
} as const satisfies WorldMechanic
