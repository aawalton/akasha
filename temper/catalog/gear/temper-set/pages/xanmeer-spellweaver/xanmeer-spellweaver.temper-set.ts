import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const xanmeerSpellweaver = {
  id: "019e66e7-6a2b-74da-ba9d-9ef177bca14e",
  type: "page-type/temper-set",
  slug: "xanmeer-spellweaver",
  title: "Xanmeer Spellweaver",
  key: "xanmeer-spellweaver",
  esoSetId: 825,
  category: "temper-set-category/no-type",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
