import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const goldCoastSurvivorElixir = {
  id: "01a0e108-307d-744e-9662-0d067d581101",
  type: "page-type/temper-potion",
  slug: "gold-coast-survivor-elixir",
  title: "Gold Coast Survivor Elixir",
  key: "gold-coast-survivor-elixir",
  itemId: 112430,
  restores: ["temper-metric/health-restore"],
} as const satisfies TemperPotion
