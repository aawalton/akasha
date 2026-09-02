import type { TemperSet } from "../../temper-set.page-type.ts"

export const elfBane = {
  id: "01a05fda-f7ce-77aa-9d09-01a8c8065d79",
  pageTypeSlug: "temper-set",
  slug: "elf-bane",
  title: "Elf Bane",
  key: "elf-bane",
  esoSetId: 83,
  subcategoryId: "pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
