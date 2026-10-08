import type { TemperDebuffMajor } from "akasha/temper/catalog/effect/temper-debuff-major/temper-debuff-major.page-type.types.ts"

export const majorDefile = {
  id: "01a05fc6-42c2-78eb-8623-62d8fda44d42",
  type: "page-type/temper-debuff-major",
  slug: "major-defile",
  title: "Major Defile",
  key: "major-defile",
  effectCategory: "healing",
  description: "Reduces healing received and damage shield strength by 12%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.874Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperDebuffMajor
