import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const flawlessRitual = {
  id: "01a0e13c-001a-7b01-8963-df1bfc7d3e55",
  type: "page-type/temper-champion-star",
  slug: "flawless-ritual",
  title: "Flawless Ritual",
  description: "Increases your chance to apply a Magical status effect by 60%",
  esoChampionSkillId: 17,
  championConstellation: "warfare",
  isSlottable: false,
  hashPlace: 75,
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-09-27T05:00:07.000Z",
} as const satisfies TemperChampionStar
