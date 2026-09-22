import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wrathOfTheImperium = {
  id: "019e66ec-7a19-72f9-9c3b-9012b3bc5c9e",
  type: "page-type/temper-set",
  slug: "wrath-of-the-imperium",
  title: "Wrath of the Imperium",
  key: "wrath-of-the-imperium",
  esoSetId: 125,
  category: "temper-set-category/pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
