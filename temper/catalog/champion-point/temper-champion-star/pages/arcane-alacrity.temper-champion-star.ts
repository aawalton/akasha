import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const arcaneAlacrity = {
  id: "01a0e13c-0019-7ccf-84fb-2617bec219d1",
  type: "page-type/temper-champion-star",
  slug: "arcane-alacrity",
  title: "Arcane Alacrity",
  description: "While under the effects of a damage shield your Roll Dodge costs 800 less Stamina",
  esoChampionSkillId: 61,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 53,
} as const satisfies TemperChampionStar
