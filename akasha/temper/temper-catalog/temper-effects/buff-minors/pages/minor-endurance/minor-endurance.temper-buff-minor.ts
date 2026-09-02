import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorEndurance = {
  id: "01a05fc5-f6be-7847-8a03-7ba959b5b8d3",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-endurance",
  title: "Minor Endurance",
  key: "minor-endurance",
  description: "Increases Stamina Recovery by 15%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
