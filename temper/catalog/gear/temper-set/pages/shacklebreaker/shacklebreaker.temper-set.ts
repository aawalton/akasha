import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const shacklebreaker = {
  id: "019e668e-9a62-76a1-8965-fcbae17e0805",
  type: "page-type/temper-set",
  slug: "shacklebreaker",
  title: "Shacklebreaker",
  key: "shacklebreaker",
  esoSetId: 325,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
