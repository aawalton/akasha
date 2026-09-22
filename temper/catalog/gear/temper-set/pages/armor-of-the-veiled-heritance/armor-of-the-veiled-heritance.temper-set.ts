import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const armorOfTheVeiledHeritance = {
  id: "019e66e7-6a41-731f-b013-1042492dfbe0",
  type: "page-type/temper-set",
  slug: "armor-of-the-veiled-heritance",
  title: "Armor of the Veiled Heritance",
  key: "armor-of-the-veiled-heritance",
  esoSetId: 36,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
