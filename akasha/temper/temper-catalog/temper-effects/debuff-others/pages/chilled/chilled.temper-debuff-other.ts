import type { TemperDebuffOther } from "../../temper-debuff-other.page-type.ts"

export const chilled = {
  id: "01a05fc6-42c6-745f-bbf7-30d7a512a5aa",
  pageTypeSlug: "temper-debuff-other",
  slug: "chilled",
  title: "Chilled",
  key: "chilled",
  description: "Applies Minor Maim, reducing damage done by 5%",
  effects: "jsonl",
} as const satisfies TemperDebuffOther
