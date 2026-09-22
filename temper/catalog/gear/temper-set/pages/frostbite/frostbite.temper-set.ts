import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const frostbite = {
  id: "019e66e7-6a60-76b3-a505-da5def8b7a30",
  type: "page-type/temper-set",
  slug: "frostbite",
  title: "Frostbite",
  key: "frostbite",
  esoSetId: 579,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
