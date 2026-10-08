import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const increaseArmor = {
  id: "019e21f7-0f66-7ae7-8005-0e1df608a596",
  type: "page-type/temper-poison-effect",
  slug: "increase-armor",
  title: "Increase Physical Resistance",
  key: "increase-armor",
  icon: "resources/crafting_alchemy_trait_increasearmor.png",
  isPositive: true,
  opposite: "temper-poison-effect/fracture",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.006Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
