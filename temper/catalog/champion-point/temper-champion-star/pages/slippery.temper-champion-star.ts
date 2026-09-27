import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const slippery = {
  id: "01a0e13c-001b-7d20-b56a-a73e4d006022",
  type: "page-type/temper-champion-star",
  slug: "slippery",
  title: "Slippery",
  description:
    "When you are affected by a disabling effect, you automatically Break Free for no cost. After using this effect, you become Winded and cannot trigger this effect or others like it for 21 seconds",
  esoChampionSkillId: 52,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 66,
} as const satisfies TemperChampionStar
