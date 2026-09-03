import type { TemperSet } from "../../temper-set.page-type.ts"

export const medusa = {
  id: "019e66e6-a0a3-777b-9da1-0970ce7fbb9c",
  pageTypeSlug: "temper-set",
  slug: "medusa",
  title: "Medusa",
  key: "medusa",
  esoSetId: 304,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
