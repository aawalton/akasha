import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const onGuard = {
  id: "01a0e13c-001b-7e9a-bb93-195668d0ae38",
  type: "page-type/temper-champion-star",
  slug: "on-guard",
  title: "On Guard",
  description:
    "While under the effects of Crowd Control Immunity, increases the amount of damage you block by 10%",
  esoChampionSkillId: 60,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 64,
} as const satisfies TemperChampionStar
