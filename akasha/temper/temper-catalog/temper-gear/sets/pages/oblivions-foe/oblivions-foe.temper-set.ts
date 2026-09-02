import type { TemperSet } from "../../temper-set.page-type.ts"

export const oblivionsFoe = {
  id: "01a05fdb-7d4d-74fc-8feb-c341007f9558",
  pageTypeSlug: "temper-set",
  slug: "oblivions-foe",
  title: "Oblivion's Foe",
  key: "oblivions-foe",
  esoSetId: 73,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
