import type { TemperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.types.ts"

export const fear = {
  id: "01a05fc6-42c8-72c5-af3c-e4d6d6faa057",
  type: "page-type/temper-debuff-other",
  slug: "fear",
  title: "Fear",
  key: "fear",
  description: "Target flees in fear and cannot take actions",
  createdAt: "2026-09-02T01:40:23.880Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffOther
