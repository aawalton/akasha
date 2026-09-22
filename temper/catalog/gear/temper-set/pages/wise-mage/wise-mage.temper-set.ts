import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wiseMage = {
  id: "019e66ec-7f2a-7efc-bd43-829b854ad840",
  type: "page-type/temper-set",
  slug: "wise-mage",
  title: "Wise Mage",
  key: "wise-mage",
  esoSetId: 139,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
