import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorIntellect = {
  id: "01a05fc5-f6bf-79d4-b0f6-4271964cb3b9",
  type: "page-type/temper-buff-minor",
  slug: "minor-intellect",
  title: "Minor Intellect",
  key: "minor-intellect",
  description: "Increases Magicka Recovery by 15%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.415Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperBuffMinor
