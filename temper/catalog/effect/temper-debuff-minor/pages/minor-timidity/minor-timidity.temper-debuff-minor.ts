import type { TemperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.types.ts"

export const minorTimidity = {
  id: "01a05fc6-42c5-7b79-ac23-5c85cf83d00f",
  type: "page-type/temper-debuff-minor",
  slug: "minor-timidity",
  title: "Minor Timidity",
  key: "minor-timidity",
  description: "Consumes 1 Ultimate every 1.5 seconds",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.877Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffMinor
