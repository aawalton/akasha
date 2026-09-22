import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const shieldOfTheValiant = {
  id: "019e66ec-790f-7a10-9bb7-12cfe4d9d189",
  type: "page-type/temper-set",
  slug: "shield-of-the-valiant",
  title: "Shield of the Valiant",
  key: "shield-of-the-valiant",
  esoSetId: 132,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
