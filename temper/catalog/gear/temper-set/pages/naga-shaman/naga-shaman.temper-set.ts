import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nagaShaman = {
  id: "019e668e-9a54-78b8-8f2d-ee3fa1d103af",
  type: "page-type/temper-set",
  slug: "naga-shaman",
  title: "Naga Shaman",
  key: "naga-shaman",
  esoSetId: 409,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
