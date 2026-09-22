import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const executionersBlade = {
  id: "019e6484-5faa-780b-86ae-ff58b7886b3c",
  type: "page-type/temper-set",
  slug: "executioners-blade",
  title: "Executioner's Blade",
  key: "executioners-blade",
  esoSetId: 557,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
