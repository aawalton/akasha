import type { TemperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.types.ts"

export const silence = {
  id: "01a05fc6-42c9-7d72-84ab-9d0e215c3b7b",
  type: "page-type/temper-debuff-other",
  slug: "silence",
  title: "Silence",
  key: "silence",
  description: "Target cannot cast abilities",
  createdAt: "2026-09-02T01:40:23.881Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffOther
