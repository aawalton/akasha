import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const vivecsDuality = {
  id: "019e66e7-6aa8-7996-96d5-d7e516b7bf6e",
  type: "page-type/temper-set",
  slug: "vivecs-duality",
  title: "Vivec's Duality",
  key: "vivecs-duality",
  esoSetId: 698,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
