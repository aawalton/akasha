import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const voidBash = {
  id: "019e6484-5fd9-706e-b092-fb9b92bcf419",
  type: "page-type/temper-set",
  slug: "void-bash",
  title: "Void Bash",
  key: "void-bash",
  esoSetId: 558,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
