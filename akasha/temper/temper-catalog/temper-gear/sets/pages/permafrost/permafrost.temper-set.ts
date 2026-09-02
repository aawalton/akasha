import type { TemperSet } from "../../temper-set.page-type.ts"

export const permafrost = {
  id: "01a05fdc-9715-7ffc-9f3d-4f2bc2f215f1",
  pageTypeSlug: "temper-set",
  slug: "permafrost",
  title: "Permafrost",
  key: "permafrost",
  esoSetId: 211,
  subcategoryId: "arena",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
