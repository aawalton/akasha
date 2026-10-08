import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const fracture = {
  id: "019e21f7-0f68-75f6-9e3d-fc3dc0eeaa27",
  type: "page-type/temper-poison-effect",
  slug: "fracture",
  title: "Fracture",
  key: "fracture",
  icon: "resources/crafting_alchemy_trait_lowerarmor.png",
  isPositive: false,
  opposite: "temper-poison-effect/increase-armor",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.008Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
