import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const draugrkinsGrip = {
  id: "019e66e6-a073-7cd7-ba5c-0bb4d134e064",
  type: "page-type/temper-set",
  slug: "draugrkins-grip",
  title: "Draugrkin's Grip",
  key: "draugrkins-grip",
  esoSetId: 474,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
