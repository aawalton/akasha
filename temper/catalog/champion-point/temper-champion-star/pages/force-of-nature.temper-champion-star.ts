import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const forceOfNature = {
  id: "01a0e13c-001a-7b49-9f69-193f3bb6e121",
  type: "page-type/temper-champion-star",
  slug: "force-of-nature",
  title: "Force of Nature",
  description:
    "Increases your Offensive Penetration by 660 for every status effect your target has",
  esoChampionSkillId: 276,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 100,
  jumpPoints: [0, 50],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:51.127Z",
} as const satisfies TemperChampionStar
