import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const whorlOfTheDepths = {
  id: "019e66ec-7f1b-760b-8a0f-17c8d9a8c217",
  type: "page-type/temper-set",
  slug: "whorl-of-the-depths",
  title: "Whorl of the Depths",
  key: "whorl-of-the-depths",
  esoSetId: 646,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
