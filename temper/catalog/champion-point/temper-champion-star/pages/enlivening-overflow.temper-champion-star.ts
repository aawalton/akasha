import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const enliveningOverflow = {
  id: "01a0e13c-001a-7344-af96-dc8aa54da9ce",
  type: "page-type/temper-champion-star",
  slug: "enlivening-overflow",
  title: "Enlivening Overflow",
  description:
    "Overhealing yourself or an ally grants them Health, Magicka, and Stamina Recovery equal to 0.5% of your Max Magicka, up to a cap of 150, for 6 seconds. This effect can occur once every 12 seconds per target",
  esoChampionSkillId: 263,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 90,
} as const satisfies TemperChampionStar
