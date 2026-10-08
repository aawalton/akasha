import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const invisible = {
  id: "019e21f7-0f75-7ecc-b654-68dde11b0d1e",
  type: "page-type/temper-poison-effect",
  slug: "invisible",
  title: "Invisible",
  key: "invisible",
  icon: "resources/crafting_alchemy_trait_invisible.png",
  isPositive: true,
  opposite: "temper-poison-effect/detection",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.021Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
