import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const quickSerpent = {
  id: "019e66ec-7e1b-77cc-a52c-3fea102bb73d",
  type: "page-type/temper-set",
  slug: "quick-serpent",
  title: "Quick Serpent",
  key: "quick-serpent",
  esoSetId: 142,
  category: "temper-set-category/trial",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
