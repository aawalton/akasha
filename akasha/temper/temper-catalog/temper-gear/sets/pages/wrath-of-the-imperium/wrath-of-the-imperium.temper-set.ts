import type { TemperSet } from "../../temper-set.page-type.ts"

export const wrathOfTheImperium = {
  id: "01a05fde-b3d0-760e-ac6b-d86f6e788397",
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
