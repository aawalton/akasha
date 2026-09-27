import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const foresight = {
  id: "01a0e13c-001a-7c72-856d-3702351efb75",
  type: "page-type/temper-champion-star",
  slug: "foresight",
  title: "Foresight",
  description:
    "After you drink a potion, the cost of your Magicka and Stamina healing abilities used within 6 seconds are reduced by 75%",
  esoChampionSkillId: 163,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 95,
} as const satisfies TemperChampionStar
