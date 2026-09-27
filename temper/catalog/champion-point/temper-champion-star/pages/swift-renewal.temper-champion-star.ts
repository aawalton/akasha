import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const swiftRenewal = {
  id: "01a0e13c-001c-7aa3-8a3f-607faff117cd",
  type: "page-type/temper-champion-star",
  slug: "swift-renewal",
  title: "Swift Renewal",
  description: "Increases your Healing Done with healing over time effects by 10%",
  esoChampionSkillId: 28,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [
    { metric: "temper-metric/healing-done-dot", effectType: "fractional-change", value: 0.1 },
  ],
  hashPlace: 98,
} as const satisfies TemperChampionStar
