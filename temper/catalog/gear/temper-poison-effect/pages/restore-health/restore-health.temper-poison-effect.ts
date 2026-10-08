import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const restoreHealth = {
  id: "019e21f7-0f55-711f-bf44-92d60627ffe6",
  type: "page-type/temper-poison-effect",
  slug: "restore-health",
  title: "Restore Health",
  key: "restore-health",
  opposite: "temper-poison-effect/ravage-health",
  cooldown: 10,
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:39.989Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
