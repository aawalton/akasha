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
} as const satisfies TemperChampionStar
