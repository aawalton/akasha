import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const shadowstrike = {
  id: "01a0e13c-001b-739b-8d39-ff55208f5889",
  type: "page-type/temper-champion-star",
  slug: "shadowstrike",
  title: "Shadowstrike",
  description:
    "When you kill an enemy with Blade of Woe, you become invisible for 5 seconds after a short delay while distracting nearby enemies or potential witnesses. While under this effect you can cast Blade of Woe",
  esoChampionSkillId: 80,
  championConstellation: "craft",
  isSlottable: true,
  hashPlace: 23,
  jumpPoints: [0, 75],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:08.592Z",
} as const satisfies TemperChampionStar
