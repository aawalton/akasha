import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const fortified = {
  id: "01a0e13c-001a-7b57-b087-1ada18c09f26",
  type: "page-type/temper-champion-star",
  slug: "fortified",
  title: "Fortified",
  description: "Grants 1731 Armor",
  esoChampionSkillId: 34,
  championConstellation: "fitness",
  isSlottable: true,
  effects: [{ metric: "temper-metric/resistance", effectType: "integer", value: 1731 }],
  hashPlace: 71,
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-09-27T05:00:07.000Z",
} as const satisfies TemperChampionStar
