import type { TemperLevelBand } from "akasha/temper/catalog/gear/temper-level-band/temper-level-band.page-type.types.ts"

export const characterLevels = {
  id: "01a0e16a-bf57-756a-ad3e-820f1c7b042f",
  type: "page-type/temper-level-band",
  slug: "character-levels",
  title: "Character levels",
  levelBandBottom: 1,
  levelBandTop: 50,
  worthLevelStart: 0,
  worthLevelSpan: 50,
} as const satisfies TemperLevelBand
