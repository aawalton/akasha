import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const siphoningSpells = {
  id: "01a0e13c-001b-7935-9a61-3534e8e9df31",
  type: "page-type/temper-champion-star",
  slug: "siphoning-spells",
  title: "Siphoning Spells",
  description: "Restore 1500 Magicka whenever you kill an enemy",
  esoChampionSkillId: 47,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 59,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:25.629Z",
} as const satisfies TemperChampionStar
