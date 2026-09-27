import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const healthElixir = {
  id: "01a0e108-307d-74eb-8579-0e711787bcd7",
  type: "page-type/temper-potion",
  slug: "health-elixir",
  title: "Health Elixir",
  key: "health-elixir",
  itemId: 34125,
  restores: ["temper-metric/health-restore"],
} as const satisfies TemperPotion
