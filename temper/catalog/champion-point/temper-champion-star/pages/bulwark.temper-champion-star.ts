import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const bulwark = {
  id: "01a0e13c-001a-7086-9122-f881a625bb82",
  type: "page-type/temper-champion-star",
  slug: "bulwark",
  title: "Bulwark",
  description:
    "While you have a Shield or Frost Staff equipped, your Spell and Physical Resistance is increased by 1900",
  esoChampionSkillId: 159,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 115,
  jumpPoints: [0, 50],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:29.661Z",
} as const satisfies TemperChampionStar
