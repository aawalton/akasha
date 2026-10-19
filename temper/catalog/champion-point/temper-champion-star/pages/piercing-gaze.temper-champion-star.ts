import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const piercingGaze = {
  id: "01a0e13c-001b-7d57-ae11-e83a815c91a9",
  type: "page-type/temper-champion-star",
  slug: "piercing-gaze",
  title: "Piercing Gaze",
  description: "Increases your Stealth Detection by 3 meters",
  esoChampionSkillId: 45,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [{ metric: "temper-metric/stealth-detection", effectType: "integer", value: 3 }],
  hashPlace: 34,
  jumpPoints: [0, 10, 20, 30],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:33.815Z",
} as const satisfies TemperChampionStar
