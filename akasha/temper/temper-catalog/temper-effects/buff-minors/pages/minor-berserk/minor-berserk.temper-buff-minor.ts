import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorBerserk = {
  id: "01a05fc5-f6bd-7b60-bab0-069ad0414b2e",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-berserk",
  title: "Minor Berserk",
  key: "minor-berserk",
  description: "Increases damage done by 5%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
