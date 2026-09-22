import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const telvanniEnforcer = {
  id: "019e66e6-a0d2-780d-bc7f-8b995fab4265",
  type: "page-type/temper-set",
  slug: "telvanni-enforcer",
  title: "Telvanni Enforcer",
  key: "telvanni-enforcer",
  esoSetId: 682,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
