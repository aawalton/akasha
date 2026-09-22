import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const bloodlordsEmbrace = {
  id: "019e6484-6027-780d-adf4-1ec68ce09503",
  type: "page-type/temper-set",
  slug: "bloodlords-embrace",
  title: "Bloodlord's Embrace",
  key: "bloodlords-embrace",
  esoSetId: 521,
  category: "temper-set-category/mythic",
  valid: ["chest:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
