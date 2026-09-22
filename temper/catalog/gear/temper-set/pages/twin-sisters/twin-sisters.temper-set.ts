import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const twinSisters = {
  id: "019e66e7-6aa0-7cf5-bd2f-9619798b3bf1",
  type: "page-type/temper-set",
  slug: "twin-sisters",
  title: "Twin Sisters",
  key: "twin-sisters",
  esoSetId: 105,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
