import type { TemperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.types.ts"

export const majorSlayer = {
  id: "01a05fc5-f6bc-739d-89da-33800d2d9daf",
  type: "page-type/temper-buff-major",
  slug: "major-slayer",
  title: "Major Slayer",
  key: "major-slayer",
  description: "Increases damage done to monsters by 10%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.412Z",
  updatedAt: "2026-10-21T17:18:18.294Z",
} as const satisfies TemperBuffMajor
