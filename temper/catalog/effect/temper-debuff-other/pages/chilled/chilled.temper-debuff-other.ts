import type { TemperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.types.ts"

export const chilled = {
  id: "01a05fc6-42c6-745f-bbf7-30d7a512a5aa",
  type: "page-type/temper-debuff-other",
  slug: "chilled",
  title: "Chilled",
  key: "chilled",
  description: "Applies Minor Maim, reducing damage done by 5%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.878Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffOther
