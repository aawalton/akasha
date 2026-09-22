import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const adamantLurker = {
  id: "019e66e7-6a3d-7a06-bf5e-e1a74c59d2d7",
  type: "page-type/temper-set",
  slug: "adamant-lurker",
  title: "Adamant Lurker",
  key: "adamant-lurker",
  esoSetId: 700,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
