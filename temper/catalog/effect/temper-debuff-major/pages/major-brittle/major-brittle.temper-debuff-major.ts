import type { TemperDebuffMajor } from "akasha/temper/catalog/effect/temper-debuff-major/temper-debuff-major.page-type.types.ts"

export const majorBrittle = {
  id: "01a05fc6-42c1-7b9e-a7e6-30fcae793727",
  type: "page-type/temper-debuff-major",
  slug: "major-brittle",
  title: "Major Brittle",
  key: "major-brittle",
  description: "Increases Critical Damage taken by 20%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.873Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffMajor
