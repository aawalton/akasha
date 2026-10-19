import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const bracingAnchor = {
  id: "01a0e13c-001a-7c30-8c0f-543023b5b5bb",
  type: "page-type/temper-champion-star",
  slug: "bracing-anchor",
  title: "Bracing Anchor",
  description:
    "While in combat, increase the amount of damage you can block by 20%, but reduces your Movement Speed by 16% at all stages",
  esoChampionSkillId: 267,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 62,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:53.811Z",
} as const satisfies TemperChampionStar
