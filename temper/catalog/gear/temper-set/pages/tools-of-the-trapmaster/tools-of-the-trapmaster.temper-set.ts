import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const toolsOfTheTrapmaster = {
  id: "019e66e7-6a25-72ce-b975-d54a43d19e24",
  type: "page-type/temper-set",
  slug: "tools-of-the-trapmaster",
  title: "Tools of the Trapmaster",
  key: "tools-of-the-trapmaster",
  esoSetId: 826,
  category: "temper-set-category/no-type",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
