import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const defensivePosition = {
  id: "019e66ec-7aca-7af0-8deb-91f46cebf23c",
  type: "page-type/temper-set",
  slug: "defensive-position",
  title: "Defensive Position",
  key: "defensive-position",
  esoSetId: 364,
  category: "temper-set-category/trial",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
