import type { TemperStatusEffect } from "akasha/temper/catalog/effect/temper-status-effect/temper-status-effect.page-type.types.ts"

export const chilled = {
  id: "01a05fc6-42c6-745f-bbf7-30d7a512a5aa",
  type: "page-type/temper-status-effect",
  slug: "chilled",
  title: "Chilled",
  key: "chilled",
  description: "Applies Minor Maim, reducing damage done by 5%",
  effects: "jsonl",
  equations: ["<<1>> = 0.008 MaxStat + 0.084 MaxPower (Dmg, Frost, SingleTarget, Direct)"],
  createdAt: "2026-09-02T01:40:23.878Z",
  updatedAt: "2026-10-28T21:27:41.270Z",
} as const satisfies TemperStatusEffect
