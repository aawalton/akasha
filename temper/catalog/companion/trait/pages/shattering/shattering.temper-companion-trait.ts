import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const shattering = {
  id: "01a05fce-c4b0-75e4-8085-89376ec1cdf3",
  type: "page-type/temper-companion-trait",
  slug: "shattering",
  key: "shattering",
  title: "Shattering",
  description: "Increases companion Penetration",
  metricId: "temper-companion-passive-metric/companion-penetration",
  effectType: "integer",
  isReduction: false,
  hashPlace: 7,
} as const satisfies TemperCompanionTrait
