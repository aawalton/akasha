import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedStingingSlashes = {
  id: "019e6484-5fc7-748d-b9e4-5f3af01a038b",
  type: "page-type/temper-set",
  slug: "perfected-stinging-slashes",
  title: "Perfected Stinging Slashes",
  key: "perfected-stinging-slashes",
  esoSetId: 530,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
