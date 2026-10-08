import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const hindrance = {
  id: "019e21f7-0f77-7884-82d0-ee5f2a49b5fe",
  type: "page-type/temper-poison-effect",
  slug: "hindrance",
  title: "Hindrance",
  key: "hindrance",
  icon: "resources/crafting_alchemy_trait_reducespeed.png",
  isPositive: false,
  opposite: "temper-poison-effect/speed",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.023Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
