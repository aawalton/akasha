import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const goldCoastSurvivorElixir = {
  id: "01a0e108-307d-744e-9662-0d067d581101",
  type: "page-type/temper-potion",
  slug: "gold-coast-survivor-elixir",
  title: "Gold Coast Survivor Elixir",
  key: "gold-coast-survivor-elixir",
  itemId: 112430,
  restores: ["temper-metric/health-restore"],
  createdAt: "2026-09-27T04:03:25.437Z",
  updatedAt: "2026-09-27T04:03:29.000Z",
} as const satisfies TemperPotion
