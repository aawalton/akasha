import type { TemperDebuffMinor } from "../../temper-debuff-minor.page-type.ts"

export const minorTimidity = {
  id: "01a05fc6-42c5-7b79-ac23-5c85cf83d00f",
  pageTypeSlug: "temper-debuff-minor",
  slug: "minor-timidity",
  title: "Minor Timidity",
  key: "minor-timidity",
  description: "Consumes 1 Ultimate every 1.5 seconds",
  effects: "jsonl",
} as const satisfies TemperDebuffMinor
