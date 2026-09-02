import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorExpedition = {
  id: "01a05fc5-f6be-74c0-90cd-6a2d176d53b2",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-expedition",
  title: "Minor Expedition",
  key: "minor-expedition",
  description: "Increases movement speed by 15%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
