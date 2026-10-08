import type { TemperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.types.ts"

export const offBalance = {
  id: "01a05fc6-42c9-771f-a300-69d3eb7f8795",
  type: "page-type/temper-debuff-other",
  slug: "off-balance",
  title: "Off Balance",
  key: "off-balance",
  description: "Allows Heavy Attacks to restore double resources and stun (non-boss enemies)",
  createdAt: "2026-09-02T01:40:23.881Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffOther
