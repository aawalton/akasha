import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedRampagingSlash = {
  id: "019e6484-5fc5-7a71-b54f-6c9e3fd26a05",
  type: "page-type/temper-set",
  slug: "perfected-rampaging-slash",
  title: "Perfected Rampaging Slash",
  key: "perfected-rampaging-slash",
  esoSetId: 523,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
