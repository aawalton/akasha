import type { TemperStatusEffect } from "akasha/temper/catalog/effect/temper-status-effect/temper-status-effect.page-type.types.ts"

export const overcharged = {
  id: "01a05fc6-42c9-7a91-b98c-6d2ae95129b5",
  type: "page-type/temper-status-effect",
  slug: "overcharged",
  title: "Overcharged",
  key: "overcharged",
  description: "Applies Minor Magickasteal to enemies",
  esoAbilityId: 148797,
  equations: ["<<1>> = 0.008 MaxStat + 0.084 MaxPower (Dmg, Magic, SingleTarget, Direct)"],
  createdAt: "2026-09-02T01:40:23.881Z",
  updatedAt: "2026-10-28T21:57:42.192Z",
} as const satisfies TemperStatusEffect
