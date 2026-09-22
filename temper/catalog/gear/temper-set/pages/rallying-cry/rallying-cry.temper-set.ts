import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const rallyingCry = {
  id: "019e66ec-7884-74c9-b7ee-06071ca0fe34",
  type: "page-type/temper-set",
  slug: "rallying-cry",
  title: "Rallying Cry",
  key: "rallying-cry",
  esoSetId: 629,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
