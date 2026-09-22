import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const azureblightReaper = {
  id: "019e66e6-a05d-7565-a46b-7d5ac1af3de1",
  type: "page-type/temper-set",
  slug: "azureblight-reaper",
  title: "Azureblight Reaper",
  key: "azureblight-reaper",
  esoSetId: 456,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
