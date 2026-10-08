import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const sharpness = {
  id: "01a0655a-7b7b-7ae1-9bd4-b86ec3eda422",
  type: "page-type/world-enchantment",
  slug: "sharpness",
  title: "Sharpness",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.803Z",
  updatedAt: "2026-09-22T13:30:30.000Z",
} as const satisfies WorldEnchantment
