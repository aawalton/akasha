import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const ravageMagicka = {
  id: "019e21f7-0f5c-7f12-a7c0-9e4d51f2c0c2",
  type: "page-type/temper-poison-effect",
  slug: "ravage-magicka",
  title: "Ravage Magicka",
  key: "ravage-magicka",
  opposite: "temper-poison-effect/restore-magicka",
  cooldown: 10,
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:39.996Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
