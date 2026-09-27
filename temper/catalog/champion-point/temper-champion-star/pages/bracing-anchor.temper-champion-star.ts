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
} as const satisfies TemperChampionStar
