import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const disciplineArtisan = {
  id: "01a0e13c-001a-799b-ac6e-ce052888e621",
  type: "page-type/temper-champion-star",
  slug: "discipline-artisan",
  title: "Discipline Artisan",
  description: "Increases experience gain for currently active skills and their skill lines by 15%",
  esoChampionSkillId: 279,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 0,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:43.784Z",
} as const satisfies TemperChampionStar
