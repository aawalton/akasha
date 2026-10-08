import type { TemperDebuffMajor } from "akasha/temper/catalog/effect/temper-debuff-major/temper-debuff-major.page-type.types.ts"

export const majorEnervation = {
  id: "01a05fc6-42c2-7cdc-8de6-8f74de69c848",
  type: "page-type/temper-debuff-major",
  slug: "major-enervation",
  title: "Major Enervation",
  key: "major-enervation",
  description: "Reduces Critical Damage done by 20%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.874Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffMajor
