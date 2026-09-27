import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const battleMastery = {
  id: "01a0e13c-0019-7540-8aff-dd2e06b2b548",
  type: "page-type/temper-champion-star",
  slug: "battle-mastery",
  title: "Battle Mastery",
  description: "Increases your chance to apply a Martial status effect by 60%",
  esoChampionSkillId: 18,
  championConstellation: "warfare",
  isSlottable: false,
  hashPlace: 77,
} as const satisfies TemperChampionStar
