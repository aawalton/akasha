import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const bulwarkRuination = {
  id: "019e66ec-7693-7a66-9979-3c8c44d31b07",
  type: "page-type/temper-set",
  slug: "bulwark-ruination",
  title: "Bulwark Ruination",
  key: "bulwark-ruination",
  esoSetId: 791,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
