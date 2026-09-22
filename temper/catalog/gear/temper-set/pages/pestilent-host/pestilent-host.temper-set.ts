import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const pestilentHost = {
  id: "019e6484-5fce-7134-abc8-d125771447ae",
  type: "page-type/temper-set",
  slug: "pestilent-host",
  title: "Pestilent Host",
  key: "pestilent-host",
  esoSetId: 543,
  category: "temper-set-category/arena",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
