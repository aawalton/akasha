import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const rampagingSlash = {
  id: "019e6484-5fd2-78c7-84d7-27bb6ca4c102",
  type: "page-type/temper-set",
  slug: "rampaging-slash",
  title: "Rampaging Slash",
  key: "rampaging-slash",
  esoSetId: 370,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
