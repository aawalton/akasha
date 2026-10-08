import type { MetricCharacterStamina } from "akasha/story/world/mechanics/metrics/metric-character/resource/stamina/metric-character-stamina.page-type.types.ts"

export const breathOfTheWildLink = {
  id: "01a10332-3d66-73d1-9c51-1fcc460a82f3",
  type: "page-type/metric-character-stamina",
  slug: "breath-of-the-wild-link",
  character: "character-other/breath-of-the-wild-link",
  description: "Link's stamina, counted in wheels.",
  value: 1,
  minValue: 0,
  maxValue: 1,
  displayOrder: 2,
  createdAt: "2026-10-03T19:16:26.598Z",
  updatedAt: "2026-10-03T19:16:29.000Z",
} as const satisfies MetricCharacterStamina
