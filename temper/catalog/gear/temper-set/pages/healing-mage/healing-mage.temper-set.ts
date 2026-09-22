import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const healingMage = {
  id: "019e66ec-7b33-7c6c-91c1-fc2803cb1ead",
  type: "page-type/temper-set",
  slug: "healing-mage",
  title: "Healing Mage",
  key: "healing-mage",
  esoSetId: 141,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
