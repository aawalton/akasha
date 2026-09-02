import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const restoreHealth = {
  id: "01a05fd8-a43e-744a-8a61-c55a3b34f7f9",
  pageTypeSlug: "temper-poison-effect",
  slug: "restore-health",
  title: "Restore Health",
  key: "restore-health",
  oppositeId: "ravage-health",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
