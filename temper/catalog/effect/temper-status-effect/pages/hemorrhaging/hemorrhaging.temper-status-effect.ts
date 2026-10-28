import type { TemperStatusEffect } from "akasha/temper/catalog/effect/temper-status-effect/temper-status-effect.page-type.types.ts"

export const hemorrhaging = {
  id: "01a05fc6-42c8-7451-a9be-d96df440db24",
  type: "page-type/temper-status-effect",
  slug: "hemorrhaging",
  title: "Hemorrhaging",
  key: "hemorrhaging",
  description: "Deals Bleed Damage over time",
  equations: ["<<1>> = 0.015 MaxStat + 0.1575 MaxPower (Dmg, Bleed, SingleTarget, DOT)"],
  createdAt: "2026-09-02T01:40:23.880Z",
  updatedAt: "2026-10-28T21:27:41.270Z",
} as const satisfies TemperStatusEffect
