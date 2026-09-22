import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const lucentEchoes = {
  id: "019e66ec-7b89-755e-a65f-b777f6015ff7",
  type: "page-type/temper-set",
  slug: "lucent-echoes",
  title: "Lucent Echoes",
  key: "lucent-echoes",
  esoSetId: 768,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
