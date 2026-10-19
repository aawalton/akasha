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
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:50.229Z",
} as const satisfies TemperChampionStar
