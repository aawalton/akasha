import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const eyeOfTheGrasp = {
  id: "019e66e7-6a5c-7d0c-bcdf-532e5bed1ba7",
  type: "page-type/temper-set",
  slug: "eye-of-the-grasp",
  title: "Eye of the Grasp",
  key: "eye-of-the-grasp",
  esoSetId: 613,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
