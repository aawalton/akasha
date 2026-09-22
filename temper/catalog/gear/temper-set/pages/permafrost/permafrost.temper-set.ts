import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const permafrost = {
  id: "019e6484-5fcd-733d-8f3d-ff2edb6c4ce4",
  type: "page-type/temper-set",
  slug: "permafrost",
  title: "Permafrost",
  key: "permafrost",
  esoSetId: 211,
  category: "temper-set-category/arena",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
