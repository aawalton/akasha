import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const bloodthornsTouch = {
  id: "019e66e7-6a49-78cf-8dc8-62e1fcaea763",
  type: "page-type/temper-set",
  slug: "bloodthorns-touch",
  title: "Bloodthorn's Touch",
  key: "bloodthorns-touch",
  esoSetId: 65,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
