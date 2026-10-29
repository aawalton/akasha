import type { TemperStatusEffect } from "akasha/temper/catalog/effect/temper-status-effect/temper-status-effect.page-type.types.ts"

export const burning = {
  id: "01a05fc6-42c6-72d6-9960-22ff2b7c8456",
  type: "page-type/temper-status-effect",
  slug: "burning",
  title: "Burning",
  key: "burning",
  description: "Deals Flame Damage over time and applies Minor Breach",
  esoAbilityId: 18084,
  effects: "jsonl",
  equations: ["<<1>> = 0.0149285 MaxStat + 0.155898 MaxPower (Dmg, Flame, SingleTarget, DOT)"],
  createdAt: "2026-09-02T01:40:23.878Z",
  updatedAt: "2026-10-29T17:40:33.164Z",
} as const satisfies TemperStatusEffect
