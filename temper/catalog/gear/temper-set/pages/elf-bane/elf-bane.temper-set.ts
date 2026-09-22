import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const elfBane = {
  id: "019e66ec-7702-74ad-9658-c91841ee8e38",
  type: "page-type/temper-set",
  slug: "elf-bane",
  title: "Elf Bane",
  key: "elf-bane",
  esoSetId: 83,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
