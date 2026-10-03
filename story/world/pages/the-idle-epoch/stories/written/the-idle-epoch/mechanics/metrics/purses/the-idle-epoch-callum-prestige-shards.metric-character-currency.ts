import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const theIdleEpochCallumPrestigeShards = {
  id: "01a10332-4088-7705-afb1-bff9cca348c0",
  type: "page-type/metric-character-currency",
  slug: "the-idle-epoch-callum-prestige-shards",
  character: "character-player/the-idle-epoch-callum",
  currency: "world-currency/the-idle-epoch-prestige-shard",
  value: 14,
  minValue: 0,
  displayOrder: 2,
  unrevealed: false,
} as const satisfies MetricCharacterCurrency
