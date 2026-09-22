import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const testOfResolve = {
  id: "019e66ec-7e83-76a2-870d-00552ddf42ad",
  type: "page-type/temper-set",
  slug: "test-of-resolve",
  title: "Test of Resolve",
  key: "test-of-resolve",
  esoSetId: 703,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
