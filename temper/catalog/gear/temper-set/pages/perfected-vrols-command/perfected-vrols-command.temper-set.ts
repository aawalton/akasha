import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedVrolsCommand = {
  id: "019e66ec-7db4-7f52-a783-d098ec6e7eda",
  type: "page-type/temper-set",
  slug: "perfected-vrols-command",
  title: "Perfected Vrol's Command",
  key: "perfected-vrols-command",
  esoSetId: 495,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
