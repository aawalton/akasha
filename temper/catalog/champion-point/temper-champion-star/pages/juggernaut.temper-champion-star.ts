import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const juggernaut = {
  id: "01a0e13c-001b-7e47-92f5-734338175c7b",
  type: "page-type/temper-champion-star",
  slug: "juggernaut",
  title: "Juggernaut",
  description: "While under the effects of Crowd Control Immunity, you take 5% less damage",
  esoChampionSkillId: 59,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 68,
} as const satisfies TemperChampionStar
