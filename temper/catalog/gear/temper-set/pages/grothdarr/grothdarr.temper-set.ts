import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const grothdarr = {
  id: "019e6484-5ff9-70e7-831e-db83ac174eb8",
  type: "page-type/temper-set",
  slug: "grothdarr",
  title: "Grothdarr",
  key: "grothdarr",
  esoSetId: 280,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
