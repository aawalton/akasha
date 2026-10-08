import type { TemperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.types.ts"

export const minorEnervation = {
  id: "01a05fc6-42c4-76bc-bee9-88b621b2df71",
  type: "page-type/temper-debuff-minor",
  slug: "minor-enervation",
  title: "Minor Enervation",
  key: "minor-enervation",
  description: "Reduces Critical Damage done by 10%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.876Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffMinor
