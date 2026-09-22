import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const lordWarden = {
  id: "019e6484-6003-7c47-8bb2-8ca82444783f",
  type: "page-type/temper-set",
  slug: "lord-warden",
  title: "Lord Warden",
  key: "lord-warden",
  esoSetId: 164,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
