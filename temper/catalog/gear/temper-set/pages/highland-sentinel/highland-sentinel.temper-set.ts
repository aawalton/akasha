import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const highlandSentinel = {
  id: "019e668e-9a48-70e0-8b8e-717833a7c680",
  type: "page-type/temper-set",
  slug: "highland-sentinel",
  title: "Highland Sentinel",
  key: "highland-sentinel",
  esoSetId: 764,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
