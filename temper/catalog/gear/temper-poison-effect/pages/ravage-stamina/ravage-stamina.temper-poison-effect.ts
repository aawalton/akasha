import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const ravageStamina = {
  id: "019e21f7-0f61-7f87-92c1-26e91cb96127",
  type: "page-type/temper-poison-effect",
  slug: "ravage-stamina",
  title: "Ravage Stamina",
  key: "ravage-stamina",
  opposite: "restore-stamina",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
