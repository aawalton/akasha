import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorToughness = {
  id: "01a05fc5-f6c2-7285-b4a6-155081e13cdc",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-toughness",
  title: "Minor Toughness",
  key: "minor-toughness",
  description: "Increases Max Health by 10%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
