import type { TemperSet } from "../../temper-set.page-type.ts"

export const telvanniEnforcer = {
  id: "01a05fde-b3a6-7612-bbae-f4efdd9f6d31",
  pageTypeSlug: "temper-set",
  slug: "telvanni-enforcer",
  title: "Telvanni Enforcer",
  key: "telvanni-enforcer",
  esoSetId: 682,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
