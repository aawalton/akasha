import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const entrapment = {
  id: "019e21f7-0f73-7ef7-a770-a4c141f2939e",
  type: "page-type/temper-poison-effect",
  slug: "entrapment",
  title: "Entrapment",
  key: "entrapment",
  icon: "resources/crafting_alchemy_trait_stun.png",
  isPositive: false,
  opposite: "temper-poison-effect/unstoppable",
  createdAt: "2026-05-13T15:31:40.019Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
