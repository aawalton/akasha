import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const fromTheBrink = {
  id: "01a0e13c-001a-7b19-9517-4b6cb7d75f28",
  type: "page-type/temper-champion-star",
  slug: "from-the-brink",
  title: "From the Brink",
  description:
    "Whenever you heal yourself or an ally under 25% Health, you grant them a damage shield that absorbs up to 11000 damage for 6 seconds. This effect can occur once every 30 seconds per target",
  esoChampionSkillId: 262,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 89,
} as const satisfies TemperChampionStar
