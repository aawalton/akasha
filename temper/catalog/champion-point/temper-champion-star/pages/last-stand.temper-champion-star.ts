import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const lastStand = {
  id: "01a0e13c-001b-7084-9e31-419cab7fb8a1",
  type: "page-type/temper-champion-star",
  slug: "last-stand",
  title: "Last Stand",
  description:
    "When you take damage below 20% Health you gain Major Heroism, granting 3 Ultimate every 1.5 seconds for 9 seconds. This effect can occur once every 9 seconds",
  esoChampionSkillId: 161,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 116,
} as const satisfies TemperChampionStar
