import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const sentry = {
  id: "019e66ec-78c9-7b84-8c2b-c792afccec8f",
  type: "page-type/temper-set",
  slug: "sentry",
  title: "Sentry",
  key: "sentry",
  esoSetId: 89,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
