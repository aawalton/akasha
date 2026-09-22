import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const vrolsCommand = {
  id: "019e66ec-7efc-7843-82cc-11bdff707804",
  type: "page-type/temper-set",
  slug: "vrols-command",
  title: "Vrol's Command",
  key: "vrols-command",
  esoSetId: 494,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
