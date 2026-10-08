import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const boundlessVitality = {
  id: "01a0e13c-0019-743b-ba2a-5ac7cf169120",
  type: "page-type/temper-champion-star",
  slug: "boundless-vitality",
  title: "Boundless Vitality",
  description: "Grants 1400 Max Health",
  esoChampionSkillId: 2,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 1400 }],
  hashPlace: 44,
  createdAt: "2026-09-27T05:00:00.921Z",
  updatedAt: "2026-09-27T05:00:07.000Z",
} as const satisfies TemperChampionStar
