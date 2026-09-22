import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const restoreStamina = {
  id: "019e21f7-0f5f-7afa-81bb-e7056a972eac",
  type: "page-type/temper-poison-effect",
  slug: "restore-stamina",
  title: "Restore Stamina",
  key: "restore-stamina",
  opposite: "ravage-stamina",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
