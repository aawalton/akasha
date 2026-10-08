import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const superSupportiveBlastResistance = {
  id: "01a0e9f0-79f4-78fd-950c-d76bf6888027",
  type: "page-type/world-enchantment",
  slug: "super-supportive-blast-resistance",
  title: "Blast Resistance",
  world: "world/super-supportive",
  description: "An enchantment that resists heat and sudden explosive force.",
  createdAt: "2026-09-28T21:34:06.324Z",
  updatedAt: "2026-09-28T21:34:09.000Z",
} as const satisfies WorldEnchantment
