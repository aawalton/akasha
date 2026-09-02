import type { TemperSet } from "../../temper-set.page-type.ts"

export const healingMage = {
  id: "01a05fda-f7e6-7116-b817-ecd45731330e",
  pageTypeSlug: "temper-set",
  slug: "healing-mage",
  title: "Healing Mage",
  key: "healing-mage",
  esoSetId: 141,
  subcategoryId: "trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
