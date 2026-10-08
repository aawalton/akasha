import type { TemperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.types.ts"

export const majorBerserk = {
  id: "01a05fc5-f6b7-7ec9-992e-57834ce2780d",
  type: "page-type/temper-buff-major",
  slug: "major-berserk",
  title: "Major Berserk",
  key: "major-berserk",
  effectCategory: "damage",
  description: "Increases damage done by 10%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.407Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperBuffMajor
