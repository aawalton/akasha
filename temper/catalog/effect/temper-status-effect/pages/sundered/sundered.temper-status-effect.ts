import type { TemperStatusEffect } from "akasha/temper/catalog/effect/temper-status-effect/temper-status-effect.page-type.types.ts"

export const sundered = {
  id: "01a05fc6-42ca-742d-913c-2ad03d8d5bbc",
  type: "page-type/temper-status-effect",
  slug: "sundered",
  title: "Sundered",
  key: "sundered",
  description: "Applies Major Breach, reducing resistances",
  esoAbilityId: 148800,
  effects: "jsonl",
  equations: ["<<1>> = 0.008 MaxStat + 0.084 MaxPower (Dmg, Physical, SingleTarget, Direct)"],
  createdAt: "2026-09-02T01:40:23.882Z",
  updatedAt: "2026-10-28T21:57:42.192Z",
} as const satisfies TemperStatusEffect
