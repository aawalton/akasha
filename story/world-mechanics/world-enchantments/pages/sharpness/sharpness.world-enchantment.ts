import type { WorldEnchantment } from "../../world-enchantment.page-type.types.ts"

export const sharpness = {
  id: "01a0655a-7b7b-7ae1-9bd4-b86ec3eda422",
  pageTypeSlug: "world-enchantment",
  type: "world-enchantment",
  slug: "sharpness",
  title: "Sharpness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldEnchantment
