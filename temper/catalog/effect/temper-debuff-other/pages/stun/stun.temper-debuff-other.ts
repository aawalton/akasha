import type { TemperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.types.ts"

export const stun = {
  id: "01a05fc6-42ca-7e93-b928-e3b3aa3cbb42",
  type: "page-type/temper-debuff-other",
  slug: "stun",
  title: "Stun",
  key: "stun",
  description: "Target is stunned and cannot take actions",
  createdAt: "2026-09-02T01:40:23.882Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffOther
