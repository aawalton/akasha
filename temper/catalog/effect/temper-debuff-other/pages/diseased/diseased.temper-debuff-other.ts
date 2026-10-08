import type { TemperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.types.ts"

export const diseased = {
  id: "01a05fc6-42c7-7c2f-8806-54ed3e556738",
  type: "page-type/temper-debuff-other",
  slug: "diseased",
  title: "Diseased",
  key: "diseased",
  description: "Applies Minor Defile, reducing healing received and damage shield strength by 6%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.879Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffOther
