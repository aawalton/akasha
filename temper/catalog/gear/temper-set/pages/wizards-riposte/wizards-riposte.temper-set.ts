import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wizardsRiposte = {
  id: "019e66ec-7a09-7f60-a5a7-317664a7433f",
  type: "page-type/temper-set",
  slug: "wizards-riposte",
  title: "Wizard's Riposte",
  key: "wizards-riposte",
  esoSetId: 329,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
