import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spriggansVigor = {
  id: "019e66e6-a0c8-7b48-ae42-aaba60d95bd4",
  type: "page-type/temper-set",
  slug: "spriggans-vigor",
  title: "Spriggan's Vigor",
  key: "spriggans-vigor",
  esoSetId: 624,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
