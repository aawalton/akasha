import type { TemperDebuffOther } from "../../temper-debuff-other.page-type.ts"

export const diseased = {
  id: "01a05fc6-42c7-7c2f-8806-54ed3e556738",
  pageTypeSlug: "temper-debuff-other",
  slug: "diseased",
  title: "Diseased",
  key: "diseased",
  description: "Applies Minor Defile, reducing healing received and damage shield strength by 6%",
  effects: "jsonl",
} as const satisfies TemperDebuffOther
