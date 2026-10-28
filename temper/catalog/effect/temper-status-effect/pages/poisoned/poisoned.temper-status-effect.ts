import type { TemperStatusEffect } from "akasha/temper/catalog/effect/temper-status-effect/temper-status-effect.page-type.types.ts"

export const poisoned = {
  id: "01a05fc6-42c9-7738-b664-0a5ebbb61a72",
  type: "page-type/temper-status-effect",
  slug: "poisoned",
  title: "Poisoned",
  key: "poisoned",
  description: "Deals Poison Damage over time and applies Minor Cowardice",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.881Z",
  updatedAt: "2026-10-28T21:24:57.225Z",
} as const satisfies TemperStatusEffect
