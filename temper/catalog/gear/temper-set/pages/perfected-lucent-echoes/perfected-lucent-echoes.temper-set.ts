import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedLucentEchoes = {
  id: "019e66ec-7cb8-7ad0-a5ba-7bd775397945",
  type: "page-type/temper-set",
  slug: "perfected-lucent-echoes",
  title: "Perfected Lucent Echoes",
  key: "perfected-lucent-echoes",
  esoSetId: 771,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
