import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorGallop = {
  id: "01a05fc5-f6bf-7532-a468-62eee7531fa6",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-gallop",
  title: "Minor Gallop",
  key: "minor-gallop",
  description: "Increases mounted speed by 15%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
