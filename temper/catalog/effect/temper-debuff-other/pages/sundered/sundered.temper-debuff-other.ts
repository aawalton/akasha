import type { TemperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.types.ts"

export const sundered = {
  id: "01a05fc6-42ca-742d-913c-2ad03d8d5bbc",
  type: "page-type/temper-debuff-other",
  slug: "sundered",
  title: "Sundered",
  key: "sundered",
  description: "Applies Major Breach, reducing resistances",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.882Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffOther
