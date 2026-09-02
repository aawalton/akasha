import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const restoreMagicka = {
  id: "01a05fd8-a43e-715c-a19d-7f61cf058a9e",
  pageTypeSlug: "temper-poison-effect",
  slug: "restore-magicka",
  title: "Restore Magicka",
  key: "restore-magicka",
  oppositeId: "ravage-magicka",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
