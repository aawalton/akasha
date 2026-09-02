import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorVitality = {
  id: "01a05fc5-f6c2-7095-abd0-326f5461266e",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-vitality",
  title: "Minor Vitality",
  key: "minor-vitality",
  description: "Increases healing received and damage shield strength by 6%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
