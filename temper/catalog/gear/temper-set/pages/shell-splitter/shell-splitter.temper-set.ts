import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const shellSplitter = {
  id: "019e66ec-78f2-7a1c-ad7b-d38c565e7436",
  type: "page-type/temper-set",
  slug: "shell-splitter",
  title: "Shell Splitter",
  key: "shell-splitter",
  esoSetId: 689,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
