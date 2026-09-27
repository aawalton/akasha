import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const bashingBrutality = {
  id: "01a0e13c-0019-7009-8561-74ec2e2bcbb2",
  type: "page-type/temper-champion-star",
  slug: "bashing-brutality",
  title: "Bashing Brutality",
  description: "Increases your Bash damage by 120",
  esoChampionSkillId: 50,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [{ metric: "temper-metric/bash-damage", effectType: "integer", value: 120 }],
  hashPlace: 38,
} as const satisfies TemperChampionStar
