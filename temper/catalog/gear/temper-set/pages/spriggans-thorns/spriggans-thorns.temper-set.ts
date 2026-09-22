import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spriggansThorns = {
  id: "019e66e7-6a90-792c-97d5-d5a683132261",
  type: "page-type/temper-set",
  slug: "spriggans-thorns",
  title: "Spriggan's Thorns",
  key: "spriggans-thorns",
  esoSetId: 286,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
