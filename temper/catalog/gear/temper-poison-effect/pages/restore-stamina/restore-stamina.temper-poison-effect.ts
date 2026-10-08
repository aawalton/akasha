import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const restoreStamina = {
  id: "019e21f7-0f5f-7afa-81bb-e7056a972eac",
  type: "page-type/temper-poison-effect",
  slug: "restore-stamina",
  title: "Restore Stamina",
  key: "restore-stamina",
  opposite: "temper-poison-effect/ravage-stamina",
  cooldown: 10,
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:39.999Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
