import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const restoreStamina = {
  id: "01a05fd8-a43e-7ffe-8586-95d335ec6b96",
  pageTypeSlug: "temper-poison-effect",
  slug: "restore-stamina",
  title: "Restore Stamina",
  key: "restore-stamina",
  oppositeId: "ravage-stamina",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
