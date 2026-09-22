import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedVoidBash = {
  id: "019e6484-5fca-7b3d-9513-b27394ffcf96",
  type: "page-type/temper-set",
  slug: "perfected-void-bash",
  title: "Perfected Void Bash",
  key: "perfected-void-bash",
  esoSetId: 564,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
