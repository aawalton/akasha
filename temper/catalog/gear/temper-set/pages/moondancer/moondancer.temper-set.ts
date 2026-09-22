import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const moondancer = {
  id: "019e66ec-7bc4-79ba-ba61-1550a3721a0f",
  type: "page-type/temper-set",
  slug: "moondancer",
  title: "Moondancer",
  key: "moondancer",
  esoSetId: 230,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
