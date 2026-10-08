import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorHeroism = {
  id: "01a05fc5-f6bf-71b4-b0dd-0dbdd3005761",
  type: "page-type/temper-buff-minor",
  slug: "minor-heroism",
  title: "Minor Heroism",
  key: "minor-heroism",
  description: "Grants 1 Ultimate every 1.5 seconds",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.415Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperBuffMinor
