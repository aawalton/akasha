import type { TemperSet } from "../../temper-set.page-type.ts"

export const medusa = {
  id: "01a05fdb-7d3d-7c4a-b98e-59cdb02d0bc5",
  pageTypeSlug: "temper-set",
  slug: "medusa",
  title: "Medusa",
  key: "medusa",
  esoSetId: 304,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
