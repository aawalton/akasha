import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const reinforced = {
  id: "01a0e13c-001b-7582-909d-a44dda0529d7",
  type: "page-type/temper-champion-star",
  slug: "reinforced",
  title: "Reinforced",
  description:
    "When you begin Bracing, you gain a damage shield that absorbs 5140 damage for 3 seconds. This effect can occur once every 10 seconds",
  esoChampionSkillId: 160,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 113,
} as const satisfies TemperChampionStar
