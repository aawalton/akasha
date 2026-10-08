import type { TemperLevelBand } from "akasha/temper/catalog/gear/temper-level-band/temper-level-band.page-type.types.ts"

export const championLevels = {
  id: "01a0e16a-bf56-79e2-8e88-a385352afb13",
  type: "page-type/temper-level-band",
  slug: "champion-levels",
  title: "Champion levels",
  levelBandPrefix: "CP",
  levelBandBottom: 10,
  levelBandTop: 160,
  worthLevelStart: 50,
  worthLevelSpan: 23,
  createdAt: "2026-09-27T05:51:04.534Z",
  updatedAt: "2026-09-27T05:51:07.000Z",
} as const satisfies TemperLevelBand
