import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const riposte = {
  id: "01a0e13c-001b-7e9a-bd12-ae7fce419c09",
  type: "page-type/temper-champion-star",
  slug: "riposte",
  title: "Riposte",
  description:
    "When you block an attack from an enemy within 7 meters, your next direct damage attack made within 5 seconds deals 33% additional damage. This effect can occur once every 5 seconds",
  esoChampionSkillId: 162,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 114,
} as const satisfies TemperChampionStar
