import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const ravageMagicka = {
  id: "01a05fd8-a43d-734e-916a-9240917d6e1e",
  pageTypeSlug: "temper-poison-effect",
  slug: "ravage-magicka",
  title: "Ravage Magicka",
  key: "ravage-magicka",
  oppositeId: "restore-magicka",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
