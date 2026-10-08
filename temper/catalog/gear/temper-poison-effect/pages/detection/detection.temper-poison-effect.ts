import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const detection = {
  id: "019e21f7-0f75-708c-b36b-42e23e829ddf",
  type: "page-type/temper-poison-effect",
  slug: "detection",
  title: "Detection",
  key: "detection",
  icon: "resources/crafting_alchemy_trait_detection.png",
  isPositive: true,
  opposite: "temper-poison-effect/invisible",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.021Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
