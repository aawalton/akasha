import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const jerallMountainsWarchief = {
  id: "019e66ec-77aa-7c9f-8b90-b78aae664f61",
  type: "page-type/temper-set",
  slug: "jerall-mountains-warchief",
  title: "Jerall Mountains Warchief",
  key: "jerall-mountains-warchief",
  esoSetId: 712,
  category: "temper-set-category/pvp",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
