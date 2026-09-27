import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const wardMaster = {
  id: "01a0e13c-001c-7e88-8b6b-5a5bf8c9c48c",
  type: "page-type/temper-champion-star",
  slug: "ward-master",
  title: "Ward Master",
  description:
    "Reduces your damage taken by 10% while Blocking and under the effects of a Damage Shield",
  esoChampionSkillId: 266,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 63,
} as const satisfies TemperChampionStar
