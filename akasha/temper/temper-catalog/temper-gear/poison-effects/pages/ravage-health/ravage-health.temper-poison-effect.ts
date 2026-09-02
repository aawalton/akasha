import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const ravageHealth = {
  id: "01a05fd8-a43d-7550-9456-2348f8b3cf96",
  pageTypeSlug: "temper-poison-effect",
  slug: "ravage-health",
  title: "Ravage Health",
  key: "ravage-health",
  oppositeId: "restore-health",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
