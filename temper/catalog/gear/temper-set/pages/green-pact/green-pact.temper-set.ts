import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const greenPact = {
  id: "019e66e7-6a62-7c22-b914-0f105e1e4e51",
  type: "page-type/temper-set",
  slug: "green-pact",
  title: "Green Pact",
  key: "green-pact",
  esoSetId: 287,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
