import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorGallop = {
  id: "01a05fc5-f6bf-7532-a468-62eee7531fa6",
  type: "page-type/temper-buff-minor",
  slug: "minor-gallop",
  title: "Minor Gallop",
  key: "minor-gallop",
  description: "Increases mounted speed by 15%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.415Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperBuffMinor
