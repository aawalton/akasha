import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const esotericEnvironmentGreaves = {
  id: "019e6484-602b-737a-aba2-f774183c3e7f",
  type: "page-type/temper-set",
  slug: "esoteric-environment-greaves",
  title: "Esoteric Environment Greaves",
  key: "esoteric-environment-greaves",
  esoSetId: 692,
  category: "temper-set-category/mythic",
  valid: ["legs:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
