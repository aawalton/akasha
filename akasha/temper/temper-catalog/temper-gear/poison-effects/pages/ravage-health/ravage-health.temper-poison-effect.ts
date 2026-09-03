import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const ravageHealth = {
  id: "019e21f7-0f57-7f81-81da-b399eeadb42b",
  pageTypeSlug: "temper-poison-effect",
  slug: "ravage-health",
  title: "Ravage Health",
  key: "ravage-health",
  oppositeId: "restore-health",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
