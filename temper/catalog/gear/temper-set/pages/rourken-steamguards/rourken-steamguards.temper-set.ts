import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const rourkenSteamguards = {
  id: "019e6484-6036-76a2-b352-52d58b516e8a",
  type: "page-type/temper-set",
  slug: "rourken-steamguards",
  title: "Rourken Steamguards",
  key: "rourken-steamguards",
  esoSetId: 760,
  category: "temper-set-category/mythic",
  valid: ["hands:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
