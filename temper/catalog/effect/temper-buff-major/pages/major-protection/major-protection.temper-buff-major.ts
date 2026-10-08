import type { TemperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.types.ts"

export const majorProtection = {
  id: "01a05fc5-f6bb-775c-aa8d-fb381102b1b2",
  type: "page-type/temper-buff-major",
  slug: "major-protection",
  title: "Major Protection",
  key: "major-protection",
  effectCategory: "protection",
  description: "Reduces damage taken by 10%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.411Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperBuffMajor
