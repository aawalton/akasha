import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const ravageStamina = {
  id: "01a05fd8-a43e-74f1-ad96-e8cac128a2c3",
  pageTypeSlug: "temper-poison-effect",
  slug: "ravage-stamina",
  title: "Ravage Stamina",
  key: "ravage-stamina",
  oppositeId: "restore-stamina",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
