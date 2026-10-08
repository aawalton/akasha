import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const theIdleEpochPrestigeShard = {
  id: "01a10332-4088-77e8-93e3-3d9e26e6cde6",
  type: "page-type/world-currency",
  slug: "the-idle-epoch-prestige-shard",
  title: "Prestige Shards",
  world: "world/the-idle-epoch",
  description: "Shards the Substrate awards at a Condense, spent on permanent prestige skills.",
  createdAt: "2026-10-03T19:16:27.400Z",
  updatedAt: "2026-10-03T19:16:30.000Z",
} as const satisfies WorldCurrency
