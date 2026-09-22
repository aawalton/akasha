import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spiderCultistCowl = {
  id: "019e66e6-a0c7-7a3a-bc42-e8880ad76cba",
  type: "page-type/temper-set",
  slug: "spider-cultist-cowl",
  title: "Spider Cultist Cowl",
  key: "spider-cultist-cowl",
  esoSetId: 297,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
