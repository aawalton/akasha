import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const unstoppable = {
  id: "019e21f7-0f72-7e85-a744-be091c685ded",
  type: "page-type/temper-poison-effect",
  slug: "unstoppable",
  title: "Unstoppable",
  key: "unstoppable",
  icon: "resources/crafting_alchemy_trait_unstoppable.png",
  isPositive: true,
  opposite: "temper-poison-effect/entrapment",
  createdAt: "2026-05-13T15:31:40.018Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
