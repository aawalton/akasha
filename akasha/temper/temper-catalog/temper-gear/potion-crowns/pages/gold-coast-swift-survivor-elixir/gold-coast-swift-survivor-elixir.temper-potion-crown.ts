import type { TemperPotionCrown } from "../../temper-potion-crown.page-type.ts"

export const goldCoastSwiftSurvivorElixir = {
  id: "01a05fd8-a44d-743a-adec-e09df9c33b84",
  pageTypeSlug: "temper-potion-crown",
  slug: "gold-coast-swift-survivor-elixir",
  title: "Gold Coast Swift Survivor Elixir",
  key: "gold-coast-swift-survivor-elixir",
  description:
    "Restore 8536 Health immediately. Grants Major Fortitude and Major Expedition, increasing your Health Recovery by 30% for 36.3 seconds, and Movement Speed by 30% for 10.5 seconds. Also grants Unstoppable for 8 seconds, granting you immunity to knockback and disabling effects.",
  displayOrder: 3,
  icon: "/esoui/art/icons/crownpotion_speed.dds",
  itemId: 124674,
  categoryId: "potions",
  subcategoryId: "crown",
  level: "Scaled",
  seconds: 36.3,
  effects: "jsonl",
  buffs: "jsonl",
} as const satisfies TemperPotionCrown
