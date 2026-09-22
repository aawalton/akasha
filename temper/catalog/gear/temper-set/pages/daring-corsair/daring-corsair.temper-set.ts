import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const daringCorsair = {
  id: "019e668e-9a3d-790c-85a8-0ab654eda06e",
  type: "page-type/temper-set",
  slug: "daring-corsair",
  title: "Daring Corsair",
  key: "daring-corsair",
  esoSetId: 468,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
