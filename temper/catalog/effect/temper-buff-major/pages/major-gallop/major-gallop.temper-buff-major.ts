import type { TemperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.types.ts"

export const majorGallop = {
  id: "01a05fc5-f6b9-7908-8978-0236de84f77d",
  type: "page-type/temper-buff-major",
  slug: "major-gallop",
  title: "Major Gallop",
  key: "major-gallop",
  description: "Increases mounted speed by 30%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.409Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperBuffMajor
