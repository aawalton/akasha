import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const thrillOfTheHunt = {
  id: "01a0e13c-001c-7826-9c7b-599f73c7bb7f",
  type: "page-type/temper-champion-star",
  slug: "thrill-of-the-hunt",
  title: "Thrill of the Hunt",
  description:
    "Whenever you kill an enemy you gain Major Expedition for 6 seconds, increasing your Movement Speed by 30%",
  esoChampionSkillId: 272,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 46,
  jumpPoints: [0, 25, 50],
  createdAt: "2026-09-27T05:00:00.924Z",
  updatedAt: "2026-10-19T22:57:46.931Z",
} as const satisfies TemperChampionStar
