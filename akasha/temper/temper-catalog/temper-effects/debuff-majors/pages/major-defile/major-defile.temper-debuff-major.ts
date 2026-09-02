import type { TemperDebuffMajor } from "../../temper-debuff-major.page-type.ts"

export const majorDefile = {
  id: "01a05fc6-42c2-78eb-8623-62d8fda44d42",
  pageTypeSlug: "temper-debuff-major",
  slug: "major-defile",
  title: "Major Defile",
  key: "major-defile",
  description: "Reduces healing received and damage shield strength by 12%",
  effects: "jsonl",
} as const satisfies TemperDebuffMajor
