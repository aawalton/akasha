import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const armorOfTheCode = {
  id: "019e6484-6046-7084-9dfd-723b3d203577",
  type: "page-type/temper-set",
  slug: "armor-of-the-code",
  title: "Armor of the Code",
  key: "armor-of-the-code",
  esoSetId: 209,
  category: "temper-set-category/other",
  valid: ["jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
