import type { TemperSet } from "../../temper-set.page-type.ts"

export const lightSpeaker = {
  id: "01a05fdb-7d33-7bc0-b1b7-be4f8a9e4bb6",
  pageTypeSlug: "temper-set",
  slug: "light-speaker",
  title: "Light Speaker",
  key: "light-speaker",
  esoSetId: 298,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
