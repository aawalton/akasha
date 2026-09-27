import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const boundGoldCoastSwiftSurvivorElixir = {
  id: "01a0e108-307d-74eb-981d-a5314e157b91",
  type: "page-type/temper-potion",
  slug: "bound-gold-coast-swift-survivor-elixir",
  title: "Bound Gold Coast Swift Survivor Elixir",
  key: "bound-gold-coast-swift-survivor-elixir",
  itemId: 135111,
  restores: ["temper-metric/health-restore"],
} as const satisfies TemperPotion
