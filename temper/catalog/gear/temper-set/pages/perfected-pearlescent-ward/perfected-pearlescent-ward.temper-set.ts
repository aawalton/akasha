import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedPearlescentWard = {
  id: "019e66ec-7cf1-7d5a-bcd8-6b3287ba1f30",
  type: "page-type/temper-set",
  slug: "perfected-pearlescent-ward",
  title: "Perfected Pearlescent Ward",
  key: "perfected-pearlescent-ward",
  esoSetId: 651,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
