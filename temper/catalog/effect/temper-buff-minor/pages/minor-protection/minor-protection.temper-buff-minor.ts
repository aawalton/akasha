import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorProtection = {
  id: "01a05fc5-f6c0-7cfc-ba1e-6bceb462b6b8",
  type: "page-type/temper-buff-minor",
  slug: "minor-protection",
  title: "Minor Protection",
  key: "minor-protection",
  effectCategory: "protection",
  description: "Reduces damage taken by 5%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.416Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperBuffMinor
