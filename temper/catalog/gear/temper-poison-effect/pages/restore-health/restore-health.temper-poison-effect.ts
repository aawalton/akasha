import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const restoreHealth = {
  id: "019e21f7-0f55-711f-bf44-92d60627ffe6",
  type: "page-type/temper-poison-effect",
  slug: "restore-health",
  title: "Restore Health",
  key: "restore-health",
  opposite: "ravage-health",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
