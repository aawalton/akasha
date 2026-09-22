import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const forceOverflow = {
  id: "019e6484-5fae-721a-b197-2f6cf55360c4",
  type: "page-type/temper-set",
  slug: "force-overflow",
  title: "Force Overflow",
  key: "force-overflow",
  esoSetId: 562,
  category: "temper-set-category/arena",
  valid: ["restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
