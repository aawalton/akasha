import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const enervatingAura = {
  id: "019e66ec-771b-7fbf-9254-0d86cce5fb5b",
  type: "page-type/temper-set",
  slug: "enervating-aura",
  title: "Enervating Aura",
  key: "enervating-aura",
  esoSetId: 631,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
