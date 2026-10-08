import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const restoreMagicka = {
  id: "019e21f7-0f5a-7596-a05b-4941725bbbb6",
  type: "page-type/temper-poison-effect",
  slug: "restore-magicka",
  title: "Restore Magicka",
  key: "restore-magicka",
  opposite: "temper-poison-effect/ravage-magicka",
  cooldown: 10,
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:39.994Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
