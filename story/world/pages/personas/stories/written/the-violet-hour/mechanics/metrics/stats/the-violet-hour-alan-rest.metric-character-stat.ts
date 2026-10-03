import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theVioletHourAlanRest = {
  id: "01a10378-45d1-786e-aa86-05c3f2b2f2e8",
  type: "page-type/metric-character-stat",
  slug: "the-violet-hour-alan-rest",
  character: "character-other/the-violet-hour-alan",
  value: 3,
  minValue: 0,
} as const satisfies MetricCharacterStat
