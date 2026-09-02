import type { TemperSet } from "../../temper-set.page-type.ts"

export const lamiasSong = {
  id: "01a05fda-f7f9-76d9-9bf6-22f9283ae63b",
  pageTypeSlug: "temper-set",
  slug: "lamias-song",
  title: "Lamia's Song",
  key: "lamias-song",
  esoSetId: 303,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
