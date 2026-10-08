import type { TemperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.types.ts"

export const immobilize = {
  id: "01a05fc6-42c8-7d77-86a2-a7b6d89bc039",
  type: "page-type/temper-debuff-other",
  slug: "immobilize",
  title: "Immobilize",
  key: "immobilize",
  description: "Target cannot move but can still attack",
  createdAt: "2026-09-02T01:40:23.880Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffOther
