import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const robesOfTheWitheredHand = {
  id: "019e66e7-6a80-7f9c-ba84-362951dffef2",
  type: "page-type/temper-set",
  slug: "robes-of-the-withered-hand",
  title: "Robes of the Withered Hand",
  key: "robes-of-the-withered-hand",
  esoSetId: 47,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
