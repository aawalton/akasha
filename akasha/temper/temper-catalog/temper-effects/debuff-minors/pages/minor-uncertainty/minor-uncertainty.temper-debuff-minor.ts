import type { TemperDebuffMinor } from "../../temper-debuff-minor.page-type.ts"

export const minorUncertainty = {
  id: "01a05fc6-42c5-7c98-ae4c-e7753e521c32",
  pageTypeSlug: "temper-debuff-minor",
  slug: "minor-uncertainty",
  title: "Minor Uncertainty",
  key: "minor-uncertainty",
  description: "Reduces Critical Rating by 1314",
  effects: "jsonl",
} as const satisfies TemperDebuffMinor
