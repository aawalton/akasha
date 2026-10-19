import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const peaceOfMind = {
  id: "01a0e13c-001b-794d-b6fe-7b523aca7643",
  type: "page-type/temper-champion-star",
  slug: "peace-of-mind",
  title: "Peace of Mind",
  description:
    "Increases Magicka and Health Recovery while under the effects of Crowd Control Immunity by 200",
  esoChampionSkillId: 54,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 69,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:26.537Z",
} as const satisfies TemperChampionStar
