import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const yandirsMight = {
  id: "019e66ec-7f49-7f1e-a2b8-561d99efd23c",
  type: "page-type/temper-set",
  slug: "yandirs-might",
  title: "Yandir's Might",
  key: "yandirs-might",
  esoSetId: 498,
  category: "temper-set-category/trial",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
