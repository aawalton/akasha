import type { TemperSet } from "../../temper-set.page-type.ts"

export const curseEater = {
  id: "01a05fda-0302-7fdc-8dbc-973066da35ff",
  pageTypeSlug: "temper-set",
  slug: "curse-eater",
  title: "Curse Eater",
  key: "curse-eater",
  esoSetId: 104,
  subcategoryId: "pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
