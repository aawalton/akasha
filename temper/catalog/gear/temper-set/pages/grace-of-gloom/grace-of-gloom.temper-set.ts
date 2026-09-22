import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const graceOfGloom = {
  id: "019e66e7-6a61-78f3-ae5d-98282dedaddc",
  type: "page-type/temper-set",
  slug: "grace-of-gloom",
  title: "Grace of Gloom",
  key: "grace-of-gloom",
  esoSetId: 382,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
