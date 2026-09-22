import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const archdruidDevyric = {
  id: "019e6484-5fec-7c16-b071-ab7edee0fff0",
  type: "page-type/temper-set",
  slug: "archdruid-devyric",
  title: "Archdruid Devyric",
  key: "archdruid-devyric",
  esoSetId: 666,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
