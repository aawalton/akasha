import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const twilightsEmbrace = {
  id: "019e668e-9a6f-7eea-8989-bc85f77b3947",
  type: "page-type/temper-set",
  slug: "twilights-embrace",
  title: "Twilight's Embrace",
  key: "twilights-embrace",
  esoSetId: 38,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
