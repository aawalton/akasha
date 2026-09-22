import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const turningTide = {
  id: "019e66e6-a0dd-734c-9ffe-36a1e7edde7c",
  type: "page-type/temper-set",
  slug: "turning-tide",
  title: "Turning Tide",
  key: "turning-tide",
  esoSetId: 622,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
