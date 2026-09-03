import type { TemperSet } from "../../temper-set.page-type.ts"

export const wrathOfTheImperium = {
  id: "019e66ec-7a19-72f9-9c3b-9012b3bc5c9e",
  pageTypeSlug: "temper-set",
  slug: "wrath-of-the-imperium",
  title: "Wrath of the Imperium",
  key: "wrath-of-the-imperium",
  esoSetId: 125,
  subcategoryId: "pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
