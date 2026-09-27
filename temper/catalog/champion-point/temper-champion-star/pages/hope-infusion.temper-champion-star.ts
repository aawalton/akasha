import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const hopeInfusion = {
  id: "01a0e13c-001a-7136-8e19-985a4bafdbed",
  type: "page-type/temper-champion-star",
  slug: "hope-infusion",
  title: "Hope Infusion",
  description:
    "Healing yourself or an ally under 50% Health grants them Minor Heroism for 1 second for every 300 Magicka Recovery you have. This effect can occur once every 10 seconds per target",
  esoChampionSkillId: 261,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 91,
} as const satisfies TemperChampionStar
