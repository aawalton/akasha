import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const steedsBlessing = {
  id: "01a0e13c-001b-780f-903b-c85019a4640a",
  type: "page-type/temper-champion-star",
  slug: "steeds-blessing",
  title: "Steed's Blessing",
  description: "Increases your out of combat Movement Speed by 20%",
  esoChampionSkillId: 66,
  championConstellation: "craft",
  isSlottable: true,
  hashPlace: 18,
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-14T17:52:12.740Z",
} as const satisfies TemperChampionStar
