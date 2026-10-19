import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const cutpursesArt = {
  id: "01a0e13c-001a-7edf-bc8f-89897d4cd666",
  type: "page-type/temper-champion-star",
  slug: "cutpurses-art",
  title: "Cutpurse's Art",
  description: "Increases the chance to get higher-quality loot when pickpocketing",
  esoChampionSkillId: 90,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 2,
  jumpPoints: [0, 25],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:58.192Z",
} as const satisfies TemperChampionStar
