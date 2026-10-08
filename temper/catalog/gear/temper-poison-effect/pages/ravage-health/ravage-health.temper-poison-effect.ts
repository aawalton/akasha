import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const ravageHealth = {
  id: "019e21f7-0f57-7f81-81da-b399eeadb42b",
  type: "page-type/temper-poison-effect",
  slug: "ravage-health",
  title: "Ravage Health",
  key: "ravage-health",
  opposite: "temper-poison-effect/restore-health",
  cooldown: 10,
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:39.991Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
