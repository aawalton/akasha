import type { TemperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.types.ts"

export const majorForce = {
  id: "01a05fc5-f6b9-7f4b-8028-9e85561d13c5",
  type: "page-type/temper-buff-major",
  slug: "major-force",
  title: "Major Force",
  key: "major-force",
  description: "Increases Critical Damage by 20%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.409Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperBuffMajor
