import type { TemperDebuffMajor } from "akasha/temper/catalog/effect/temper-debuff-major/temper-debuff-major.page-type.types.ts"

export const majorMaim = {
  id: "01a05fc6-42c2-794d-84af-249d34bd9a2f",
  type: "page-type/temper-debuff-major",
  slug: "major-maim",
  title: "Major Maim",
  key: "major-maim",
  effectCategory: "protection",
  description: "Reduces damage done by 10%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.874Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperDebuffMajor
