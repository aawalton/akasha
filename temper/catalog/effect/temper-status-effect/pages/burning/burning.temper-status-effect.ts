import type { TemperStatusEffect } from "akasha/temper/catalog/effect/temper-status-effect/temper-status-effect.page-type.types.ts"

export const burning = {
  id: "01a05fc6-42c6-72d6-9960-22ff2b7c8456",
  type: "page-type/temper-status-effect",
  slug: "burning",
  title: "Burning",
  key: "burning",
  description: "Deals Flame Damage over time and applies Minor Breach",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.878Z",
  updatedAt: "2026-10-28T21:24:57.225Z",
} as const satisfies TemperStatusEffect
