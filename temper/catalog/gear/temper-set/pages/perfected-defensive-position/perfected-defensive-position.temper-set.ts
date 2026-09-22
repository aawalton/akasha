import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedDefensivePosition = {
  id: "019e66ec-7c71-774f-8b8e-b2f5d8f0c9e2",
  type: "page-type/temper-set",
  slug: "perfected-defensive-position",
  title: "Perfected Defensive Position",
  key: "perfected-defensive-position",
  esoSetId: 358,
  category: "temper-set-category/trial",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
