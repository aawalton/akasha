import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitHarmonyLegendary = {
  id: "01a0d3e9-bd97-72c0-8afe-843b5d48c64a",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-harmony-legendary",
  title: "Harmony at Legendary",
  thing: "temper-jewelry-trait/harmony",
  quality: "temper-quality/legendary",
  value: 880,
} as const satisfies TemperGearGrade
