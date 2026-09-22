import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const affliction = {
  id: "019e66ec-75f2-76dd-8728-c3fc3e33b1df",
  type: "page-type/temper-set",
  slug: "affliction",
  title: "Affliction",
  key: "affliction",
  esoSetId: 101,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
