import type { TemperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.types.ts"

export const majorBrutality = {
  id: "01a05fc5-f6b7-7907-9866-c2bbf35cbe5e",
  type: "page-type/temper-buff-major",
  slug: "major-brutality",
  title: "Major Brutality",
  key: "major-brutality",
  effectCategory: "damage",
  description: "Increases Weapon Damage by 20%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.407Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperBuffMajor
