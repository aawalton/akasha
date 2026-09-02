import type { TemperDebuffOther } from "../../temper-debuff-other.page-type.ts"

export const sundered = {
  id: "01a05fc6-42ca-742d-913c-2ad03d8d5bbc",
  pageTypeSlug: "temper-debuff-other",
  slug: "sundered",
  title: "Sundered",
  key: "sundered",
  description: "Applies Major Breach, reducing resistances",
  effects: "jsonl",
} as const satisfies TemperDebuffOther
