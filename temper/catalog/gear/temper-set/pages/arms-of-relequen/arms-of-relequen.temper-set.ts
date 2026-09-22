import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const armsOfRelequen = {
  id: "019e66ec-7a44-770e-a73a-4f69beb07301",
  type: "page-type/temper-set",
  slug: "arms-of-relequen",
  title: "Arms of Relequen",
  key: "arms-of-relequen",
  esoSetId: 389,
  category: "temper-set-category/trial",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
